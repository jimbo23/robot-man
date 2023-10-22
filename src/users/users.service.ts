import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: { username },
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}
