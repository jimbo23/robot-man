import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RobotsService } from './robots.service';
import { UpdateRobotDto, updateRobotSchema } from './dto/update-robot.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateRobotDto,
  createRobotSchema,
} from 'src/robots/dto/create-robot.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

@Roles(Role.Operator)
@UseGuards(AuthGuard, RolesGuard)
@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRobotSchema))
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotsService.create(createRobotDto);
  }

  @Get()
  findAll() {
    return this.robotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.robotsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateRobotSchema))
  update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    return this.robotsService.update(id, updateRobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.robotsService.remove(id);
  }

  @Roles(Role.Admin)
  @Post(':robotId/assign-company/:companyId')
  async assignRobotToCompany(
    @Param('robotId') robotId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.robotsService.assign(robotId, companyId);
  }

  @Roles(Role.Admin)
  @Post(':robotId/unassign-company')
  async unassignRobot(@Param('robotId') robotId: string) {
    return this.robotsService.unassign(robotId);
  }
}
