import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from 'src/prisma.service';
import { TurmasService } from '../turmas/turmas.service';

@Injectable()
export class MatriculasService {
  constructor(
    private prisma: PrismaService,
    private turmasService: TurmasService,
  ) {}

  async validarAlunoExiste(idAluno: number) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id: idAluno },
    });
    if (!aluno) {
      throw new BadRequestException('Aluno não encontrado no banco de dados.');
    }
  }

  async validarTurmaExiste(idTurma: number) {
    const turma = await this.turmasService.buscarTurma(idTurma);
    if (!turma) {
      throw new BadRequestException('Turma não encontrada no banco de dados.');
    }
  }

  validarStatus(status: string) {
    const statusValidos = ['concluído', 'em andamento'];
    if (!statusValidos.includes(status)) {
      throw new BadRequestException(
        'O status deve ser "concluído" ou "em andamento".',
      );
    }
  }

  async criarMatricula(data: CreateMatriculaDto) {
    await this.validarAlunoExiste(data.idAluno);
    await this.validarTurmaExiste(data.idTurma);
    this.validarStatus(data.status);
    
    // Validação se matricula já existe
    const matriculaExistente = await this.prisma.matricula.findFirst({
      where: {
        idAluno: data.idAluno,
        idTurma: data.idTurma,
        status: data.status,
      },
    });
    if (matriculaExistente) {
      throw new BadRequestException('Matrícula já existente.');
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

  async listarTodasAsMatriculas() {
    try {
      return await this.prisma.matricula.findMany();
    } catch (error) {
      throw new Error(`Erro ao buscar todas as matrículas: ${error.message}`);
    }
  }

  async buscarMatricula(id: number) {
    try {
      const turma = await this.prisma.matricula.findUnique({
        where: { id },
      });
      if (!turma) {
        throw new Error(`Matrícula com ID ${id} não encontrada.`);
      }
      return turma;
    } catch (error) {
      throw new Error(`Erro ao buscar a turma com ID ${id}: ${error.message}`);
    }
  }

  async atualizarMatricula(id: number, data: Partial<CreateMatriculaDto>) {
    try {
      const matricula = await this.buscarMatricula(id);
      if (!matricula) {
        throw new BadRequestException('Matrícula não encontrada.');
      }

      await this.validarAlunoExiste(data.idAluno)
      await this.validarTurmaExiste(data.idTurma)
      this.validarStatus(data.status)

      const updatedMatricula = await this.prisma.matricula.update({
        where: { id },
        data: data,
      });
      return updatedMatricula;
    } catch (error) {
      throw new Error(`Erro ao atualizar a matrícula: ${error.message}`);
    }
  }

  async removerMatricula(id: number) {
    try {
      const matriculaDeletada = await this.prisma.matricula.delete({
        where: { id },
      });

      return {
        message: 'Matrícula deletada com sucesso!',
        data: matriculaDeletada,
      };
    } catch (error) {
      throw new Error(`Erro ao remover a matrícula: ${error.message}`);
    }
  }
}