import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InstituicoesService {
  constructor(private prisma: PrismaService) { }

  // criar uma oferta de turma
  async criarOfertaTurmas(idInstituicao: number, turmaNome: string) {
   const turma = await this.prisma.turma.create({
     data: {
        nome: turmaNome,
        instituicaoId: idInstituicao,
      },
    });
     return turma;
  }

  // editar uma turma
  async editarTurma(idTurma: number, novoNome: string){
    const turma = await this.prisma.turma.update({
      where:{
        id: idTurma
      },
      data:{
        nome: novoNome
      },
    });
    return turma;
  }

  // excluir uma turma
  async excluirTurma(idTurma: number){
    const turma = await this.prisma.turma.delete({
      where:{
        id: idTurma
      },
    });
    return turma;
  }

  // cadastrar uma disciplina
  async cadastrarDisciplina(idInstituicao: number, disciplinaNome: string) {
     const disciplina = await this.prisma.disciplina.create({
       data:{
        nome: disciplinaNome,
        instituicaoId: idInstituicao,
       },
     });
     return disciplina;
  }

  // editar uma disciplina
  async editarDisciplina(idDisciplina:number, novoNome: string){
    const disciplina = await this.prisma.disciplina.update({
      where:{
        id: idDisciplina
      },
      data:{
        nome: novoNome
      },
    });
    return disciplina;
  }

  // excluir uma disciplina
  async excluirDisciplina(idDisciplina: number){
    const disciplina = await this.prisma.disciplina.delete({
      where:{
        id: idDisciplina
      },
    });
    return disciplina;
  }

  // adicionar uma instituição
  async adicionarInstituicao(idUsuario: number) {
    const instituicao = await this.prisma.instituicao.create({
      data: {
        idUsuario,
      },
    });
    return instituicao;
  }

}
