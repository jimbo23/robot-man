import { Module } from '@nestjs/common';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RobotsController],
  providers: [RobotsService, PrismaService],
})
export class RobotsModule {}
