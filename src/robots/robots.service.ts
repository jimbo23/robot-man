import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';

@Injectable()
export class RobotsService {
  constructor(private prismaService: PrismaService) {}

  create(createRobotDto: CreateRobotDto) {
    return this.prismaService.robot.create({ data: createRobotDto });
  }

  findAll() {
    return this.prismaService.robot.findMany({ include: { company: true } });
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.robot.findUniqueOrThrow({
        where: { id },
        include: { company: true },
      });
    } catch {
      throw new NotFoundException(`Robot with id ${id} is not found!`);
    }
  }

  async update(id: string, updateRobotDto: UpdateRobotDto) {
    await this.findOne(id);
    return this.prismaService.robot.update({
      where: { id },
      data: updateRobotDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.robot.delete({ where: { id } });
      return { message: `Robot with id ${id} is deleted` };
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async assign(robotId: string, companyId: string) {
    const isAssigned = (await this.findOne(robotId)).company_id !== null;

    if (isAssigned)
      throw new UnprocessableEntityException('Robot is already assigned!');

    return await this.prismaService.robot.update({
      where: { id: robotId },
      data: {
        company_id: companyId,
      },
      include: { company: true },
    });
  }

  async unassign(robotId: string) {
    const isAssigned = (await this.findOne(robotId)).company_id !== null;

    if (!isAssigned)
      throw new UnprocessableEntityException(
        'Robot is not assigned to any company!',
      );

    return await this.prismaService.robot.update({
      where: { id: robotId },
      data: {
        company_id: null,
      },
      include: { company: true },
    });
  }
}
