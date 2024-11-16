import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatriculasService {
  constructor(private prisma: PrismaService) { }
  
  async criarMatricula(data: CreateMatriculaDto) {
    if (!Number.isInteger(data.idAluno) || data.idAluno <= 0) {
      throw new Error('idAluno deve ser um número inteiro positivo.');
    }
    const alunoExistente = await this.prisma.aluno.findUnique({
      where: { id: data.idAluno },
    });

    if (!alunoExistente) {
      throw new Error('Aluno não encontrado no banco de dados.')
    }

    if (!Number.isInteger(data.idTurma)|| data.idTurma <= 0) {
      throw new Error('idTurma deve ser um número inteiro positivo.');
    }

    const turmaExistente = await this.prisma.aluno.findUnique({
      where: { id: data.idTurma },
    });

    if (!turmaExistente) {
      throw new Error('Turma não encontrado no banco de dados.')
    }

    if (!['concluído', 'em andamento'].includes(data.status)) {
      throw new Error('O status deve ser "concluído" ou "em andamento".');
    }

    const matriculaExistente = await this.prisma.matricula.findFirst({
      where: {
        idAluno: data.idAluno,
        idTurma: data.idTurma,
      },
    });

    if (matriculaExistente) {
      throw new Error('Aluno já está matriculado nessa turma.');
    }

    const matriculaCriada = await this.prisma.matricula.create({
      data: {
        idAluno: data.idAluno,
        idTurma: data.idTurma,
        status: data.status,
      },
    });

    return {
      message: 'Matrícula criada com sucesso!',
      matricula: matriculaCriada,
    };
  }

  listarTodasAsMatriculas() {
    return `This action returns all matriculas`;
  }

  buscarMatricula(id: number) {
    return `This action returns a #${id} matricula`;
  }

  atualizarMatricula(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    return `This action updates a #${id} matricula`;
  }

  removerMatricula(id: number) {
    return `This action removes a #${id} matricula`;
  }
}
