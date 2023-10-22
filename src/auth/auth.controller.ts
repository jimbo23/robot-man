import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { loginSchema } from './dto/login.dto';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto, registerSchema } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  // @ts-ignore
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req: Request) {
    return req['user'];
  }
}
