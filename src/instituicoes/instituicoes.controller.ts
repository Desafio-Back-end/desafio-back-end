import { Controller, Get, Post, Body, Patch, Param,Delete } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Instituicao)
@Controller('instituicoes')
export class InstituicoesController {
  constructor(private readonly instituicoesService: InstituicoesService) { }

  // criar oferta de turmas
  @Post(':idInstituicoes/oferta')
  criarOfertaDeTurmas(
    @Param('idInstituicoes') idInstituicoes: number,
    @Body('oferta') oferta: string,
  ) {
    return this.instituicoesService.criarOfertaTurmas(idInstituicoes, oferta);
  }

  // editar a turma
  @Patch('turmas/:idTurma')
  editarTurma(
    @Param('idTurma') idTurma:number,
    @Body('nome') novoNome: string,
  ){
    return this.instituicoesService.editarTurma(idTurma, novoNome);
  }

  // excluir uma turma
  @Delete('turmas/:idTurma')
  excluirTurma(
    @Param('idTurma') idTurma: number
  ){
    return this.instituicoesService.excluirTurma(idTurma);
  }

  //cadastro de disciplina
  @Post(':idInstituicoes/disciplina')
  cadastrarDisciplina(
    @Param('idInstituicoes') idInstituicoes: number,
    @Body('disciplina') disciplina: string,
  ) {
    return this.instituicoesService.cadastrarDisciplina(idInstituicoes, disciplina);
  }

  @Post('adicionar')
  adicionarInstituicao(@Body('idUsuario') idUsuario: number) {
    return this.instituicoesService.adicionarInstituicao(idUsuario);
  }
}