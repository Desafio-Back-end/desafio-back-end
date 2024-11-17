import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InstituicoesService {
  constructor(private prisma: PrismaService) { }

  // criar uma oferta de turma
  async criarOfertaTurmas(idProfessor:number, idDisciplina:number, horarioTurno:string, anoSemestre:string, numVagas:number) {
    const turma = await this.prisma.turma.create({
      data: {
        idProfessor, // Relaciona o professor
        idDisciplina, // Relaciona a disciplina
        horarioTurno,
        anoSemestre,
        numVagas,
      },
    });
     return turma; 
  }
  // editar uma turma
  async editarTurma(idTurma: number, updates: { horarioTurno?: string; anoSemestre?: string; numVagas?: number }) {
  // verifica se a turma existe
    const turma = await this.prisma.turma.findUnique({
      where: { id: idTurma },
    });

    // atualizar os campos 
    const turmaAtualizada = await this.prisma.turma.update({
      where: { id: idTurma },
      data: updates,
    });

    return turmaAtualizada;
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
        preRequisito: idInstituicao
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
