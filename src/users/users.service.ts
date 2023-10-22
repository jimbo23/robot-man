import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string) {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }

  async createOne(username: string, hashed_password: string) {
    return await this.prismaService.user.create({
      data: { hashed_password, username },
    });
  }
}
