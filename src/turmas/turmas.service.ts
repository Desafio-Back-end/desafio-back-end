import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { PrismaService } from 'src/prisma.service';
import { Turma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TurmasService {
  constructor(private prisma: PrismaService) { }

  async validarProfessorExiste(idProfessor: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id: idProfessor },
    });
    if (!professor) {
      throw new BadRequestException('Professor não encontrado no banco de dados.');
    }
  }

  async validarDisciplinaExiste(idDisciplina: number) {
    const disciplina = await this.prisma.disciplina.findUnique({
      where: { id: idDisciplina },
    });
    if (!disciplina) {
      throw new BadRequestException('Disciplina não encontrada no banco de dados.');
    }
  }

  validarHorarioTurno(horarioTurno: string) {
    if (horarioTurno && !/^[1-7][1-3]$/.test(horarioTurno)) {
      throw new BadRequestException(
        'O horarioTurno deve estar no formato diaSemana/turno (ex: 43 para quarta-feira (4) de noite (3)).',
      );
    }
  }

  validarAnoSemestre(anoSemestre: string) {
    if (anoSemestre && !/^\d{4}\/[1-2]$/.test(anoSemestre)) {
      throw new BadRequestException(
        'O anoSemestre deve estar no formato YYYY/S (ex: 2024/2, ano 2024, segundo semestre).',
      );
    }
  }

  validarNumVagas(numVagas: number) {
    if (!Number.isInteger(numVagas) || numVagas < 0) {
      throw new BadRequestException(
        'O número de vagas deve ser um inteiro maior ou igual a 0.',
      );
    }
  }

  async criarTurma(data: CreateTurmaDto) {
    await this.validarProfessorExiste(data.idProfessor)
    await this.validarDisciplinaExiste(data.idDisciplina)
    this.validarHorarioTurno(data.horarioTurno)
    this.validarAnoSemestre(data.anoSemestre)
    this.validarNumVagas(data.numVagas)

    const turmaCriada = await this.prisma.turma.create({
      data,
    });

    return {
      message: 'Turma criada com sucesso!',
      data: turmaCriada,
    };
  }

  async listarTodasAsTurmas(): Promise<Turma[]> {
    try {
      return await this.prisma.turma.findMany(
        {
          include: {
            disciplina: true,
            professor: {
              include: {
                usuario: true
              }
            }
          }
        }
      );
    } catch (error) {
      throw new Error(`Erro ao buscar todas as turmas: ${error.message}`);
    }
  }

  async buscarTurma(id: number) {
    try {
      const turma = await this.prisma.turma.findUnique({
        where: { id },
      });
      if (!turma) {
        throw new Error(`Turma com ID ${id} não encontrada.`);
      }
      return turma;
    } catch (error) {
      throw new Error(`Erro ao buscar a turma com ID ${id}: ${error.message}`);
    }
  }

  async atualizarTurma(id: number, data: Partial<CreateTurmaDto>) {
    try {
      const turma = await this.buscarTurma(id)
      if (!turma) {
        throw new BadRequestException('Turma não encontrada no banco de dados.');
      }

      //await this.validarProfessorExiste(data.idProfessor)
      await this.validarDisciplinaExiste(data.idDisciplina)
      this.validarHorarioTurno(data.horarioTurno)
      this.validarAnoSemestre(data.anoSemestre)
      this.validarNumVagas(data.numVagas)

      const updatedTurma = await this.prisma.turma.update({
        where: { id },
        data: data,
      });
      return updatedTurma;
    } catch (error) {
      throw new Error(`Erro ao atualizar a turma: ${error.message}`);
    }
  }

  async removerTurma(id: number) {
    try {
      const turmaDeletada = await this.prisma.turma.delete({
        where: { id },
      });

      return {
        message: 'Turma deletada com sucesso!',
        data: turmaDeletada,
      };
    } catch (error) {
      throw new Error(`Erro ao remover a turma: ${error.message}`);
    }
  }

  async listarTurmasVinculadasProfessor(idUsuario: number) {
    try {
      const professor = await this.prisma.professor.findFirst({
        where: { idUsuario: idUsuario },
      });
      return await this.prisma.turma.findMany({
        where: {
          idProfessor: professor.id
        }
      });

    } catch (error) {
      throw new Error(`Erro ao buscar turmas vinculadas ao professor: ${error.message}`);
    }
  }
}