import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Instituicao)
@Controller('instituicoes')
export class InstituicoesController {
  constructor(private readonly instituicoesService: InstituicoesService) { }

  @Post(':idInstituicoes/oferta')
  criarOfertaDeTurmas(
    @Param('idInstituicoes') idInstituicoes: number,
    @Body('oferta') oferta: string,
  ) {
    return this.instituicoesService.criarOfertaTurmas(idInstituicoes, oferta);
  }

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