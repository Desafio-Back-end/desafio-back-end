import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Aluno)
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunosService) { }

  @Post('idAluno/matricular')
  matricular(
    @Param('idAluno') idAluno: number,
    @Body('turma') turma: number,
  ) {
    return this.alunoService.matricular(idAluno, turma);
  }

  @Post('adicionar')
  adicionarAluno(
    @Body('idUsuario') idUsuario: number
  ) {
    return this.alunoService.adicionarAluno(idUsuario);
  }
}
