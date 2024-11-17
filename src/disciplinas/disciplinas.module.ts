import { Module } from '@nestjs/common';
import { DisciplinasService } from './disciplinas.service';
import { DisciplinasController } from './disciplinas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DisciplinasController],
  providers: [DisciplinasService, PrismaService],
})
export class DisciplinasModule {}
