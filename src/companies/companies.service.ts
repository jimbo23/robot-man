import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.prismaService.company.create({ data: createCompanyDto });
  }

  findAll() {
    return this.prismaService.company.findMany({ include: { robots: true } });
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.company.findUniqueOrThrow({
        where: { id },
        include: { robots: true },
      });
    } catch {
      throw new NotFoundException(`Company with id ${id} is not found!`);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);
    return this.prismaService.company.update({
      where: { id },
      data: updateCompanyDto,
      include: { robots: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.company.delete({ where: { id } });
      return { message: `Company with id ${id} is deleted` };
    } catch {
      throw new UnprocessableEntityException();
    }
  }
}
