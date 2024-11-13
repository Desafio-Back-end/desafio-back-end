import { Module } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { InstituicoesController } from './instituicoes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InstituicoesController],
  providers: [InstituicoesService, PrismaService],
})
export class InstituicoesModule {}
