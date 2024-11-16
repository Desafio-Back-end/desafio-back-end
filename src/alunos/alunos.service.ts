import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) { }

  // criar uma matricula
  async matricular(idAluno: number, turma: number) {
    const turmaInformacao = await this.prisma.turma.findUnique({
      where: {
        id: turma,
      },
      select: {
        anoSemestre: true,
        horarioTurno: true
      },
    });

    if (!turmaInformacao) {
      throw new BadRequestException("Turma escolhida não foi encontrada")
    }

    //verificação de matricula
    const existeMatricula = await this.prisma.matricula.findFirst({
      where: {
        idAluno: idAluno,
        idTurma: turma
      },
    });

    if (existeMatricula) {
      throw new BadRequestException("Aluno já matriculado")
    }

  }

  // adicionar um aluno
  async adicionarAluno(idUsuario: number) {
    const aluno = await this.prisma.aluno.create({
      data: {
        idUsuario,
      },
    });
    return aluno;
  }
}
