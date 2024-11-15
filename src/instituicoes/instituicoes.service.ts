import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InstituicoesService {
  constructor(private prisma: PrismaService) { }

  async criarOfertaTurmas(idInstituicao: number, turmaNome: string) {
    // const turma = await this.prisma.turma.create({
    //   data: {
    //     nome: turmaNome,
    //     instituicaoId: idInstituicao,
    //   },
    // });
    // return turma;
  }

  async cadastrarDisciplina(idInstituicao: number, disciplinaNome: string) {
    // const disciplina = await this.prisma.disciplina.create({
    //   data: {
    //     nome: disciplinaNome,
    //     // idInstituicao: idInstituicao,
    //   },
    // });
    // return disciplina;
  }

  async adicionarInstituicao(idUsuario: number) {
    const instituicao = await this.prisma.instituicao.create({
      data: {
        idUsuario,
      },
    });
    return instituicao;
  }

}
