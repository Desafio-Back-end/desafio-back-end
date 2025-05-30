import { Module } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TurmasController],
  providers: [TurmasService, PrismaService],
})
export class TurmasModule {}
