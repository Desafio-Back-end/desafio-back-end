import { Module } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { MatriculasController } from './matriculas.controller';
import { PrismaService } from 'src/prisma.service';
import { TurmasService } from '../turmas/turmas.service';

@Module({
  controllers: [MatriculasController],
  providers: [MatriculasService, PrismaService, TurmasService],
})
export class MatriculasModule {}
