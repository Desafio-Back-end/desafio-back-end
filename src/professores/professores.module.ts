import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService, PrismaService],
})
export class ProfessoresModule {}
