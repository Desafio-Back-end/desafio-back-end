import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  async matricular(idAluno: number, turma: string){
    const turmaInformacao = await this.prisma.turma.findUnique({
      where:{
        idTurma: turma,
      },
      select:{
        anoSemestre: true,
        horarioTurno: true
      },
    });

    if(!turmaInformacao){
      throw new BadRequestException("Turma escolhida não foi encontrada")
    }

    //verificação de matricula
    const existeMatricula = await this.prisma.matricula.findFirst({
      where:{
        idAluno: idAluno,
        idTurma:{
          anoSemestre: turmaInformacao.anoSemestre,
          horarioTurno: turmaInformacao.horarioTurno
        },
      },
    });

    if(existeMatricula){
      throw new BadRequestException("Aluno já matriculado")
    }

  }

  async adicionarAluno(idUsuario: number) {
    const aluno = await this.prisma.aluno.create({
      data: {
        idUsuario,
      },
    });
    return aluno;
  }
}
