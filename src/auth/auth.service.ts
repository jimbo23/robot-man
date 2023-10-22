import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, username } = registerDto;
    const isExisting = await this.usersService.findOne(username);

    if (isExisting) throw new ConflictException();

    const hashed_password = await bcrypt.hash(password, 5);

    return await this.usersService.createOne(username, hashed_password);
  }

  async login(loginDto: LoginDto) {
    const { username, password: providedPassword } = loginDto;
    const user = await this.usersService.findOne(username);

    // Throw error when User not found or false credentials provided.
    if (!user) throw new UnauthorizedException('Incorrect credentials');

    const isPasswordCorrect = await bcrypt.compare(
      providedPassword,
      user.hashed_password,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Incorrect credentials');

    const payload = {
      sub: user.username,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
