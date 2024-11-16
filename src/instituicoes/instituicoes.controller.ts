import { Controller, Get, Post, Body, Patch, Param,Delete } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Instituicao)
@Controller('instituicoes')
export class InstituicoesController {
  constructor(private readonly instituicoesService: InstituicoesService) { }

  // criar oferta de turmas
  @Post('turmas/criar')
  criarOfertaTurmas(
    @Body('idProfessor') idProfessor: number,
    @Body('idDisciplina') idDisciplina: number,
    @Body('horarioTurno') horarioTurno: string,
    @Body('anoSemestre') anoSemestre: string,
    @Body('numVagas') numVagas: number,
  ){
    return this.instituicoesService.criarOfertaTurmas(
      idProfessor,idDisciplina,horarioTurno,anoSemestre,numVagas
    );
  }

  // editar a turma
  @Patch('turmas/:idTurma')
  editarTurma(
    @Param('idTurma') idTurma: number,
    @Body('horarioTurno') horarioTurno?:string,
    @Body('anoSemestre') anoSemestre?: string,
    @Body('numVagas') numVagas?:number,
  ){
    return this.instituicoesService.editarTurma(idTurma,{
      horarioTurno,
      anoSemestre,
      numVagas,
    });
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

  // editar uma disciplina
  @Patch('disciplina/:idDisciplina')
  editarDisciplina(
    @Param('idDisciplina') idDisciplina: number,
    @Body('nome') novoNome: string,
  ){
    return this.instituicoesService.editarDisciplina(idDisciplina, novoNome);
  }

  // excluir uma disciplina
  @Delete('disciplina/:idDisciplina')
  excluirDisciplina(
    @Param('idDisciplina') idDisciplina: number
  ){
    return this.instituicoesService.excluirDisciplina(idDisciplina);
  }

  // adicionar uma instituição
  @Post('adicionar')
  adicionarInstituicao(@Body('idUsuario') idUsuario: number) {
    return this.instituicoesService.adicionarInstituicao(idUsuario);
  }
}