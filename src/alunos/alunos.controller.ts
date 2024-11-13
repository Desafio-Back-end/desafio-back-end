import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunosService){}

  @Post('idAluno/matricular')
  matricular(
    @Param('idAluno') idAluno: number,
    @Body('turma') turma: string,
  ){
    return this.alunoService.matricular(idAluno, turma);
  }

  @Post('adicionar')
  adicionarAluno(
    @Body('idUsuario') idUsuario: number
  ){
    return this.alunoService.adicionarAluno(idUsuario);
  }
}
