import { Module } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { MatriculasController } from './matriculas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MatriculasController],
  providers: [MatriculasService, PrismaService],
})
export class MatriculasModule {}
