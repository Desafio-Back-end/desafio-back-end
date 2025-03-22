import { Controller, Post, Body, Param } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';
import { Public } from 'src/auth/public.decorator';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunosService) { }

  @Post('idAluno/matricular')
  @TipoUsuarios(TipoUsuario.Aluno)
  matricular(
    @Param('idAluno') idAluno: number,
    @Body('turma') turma: number,
  ) {
    return this.alunoService.matricular(idAluno, turma);
  }
  @Public()
  @Post('adicionar')
  adicionarAluno(
    @Body('idUsuario') idUsuario: number
  ) {
    return this.alunoService.adicionarAluno(idUsuario);
  }
}
