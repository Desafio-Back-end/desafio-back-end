import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/prisma.service';
import { Turma } from '@prisma/client';

@Injectable()
export class TurmasService {
  constructor(private prisma: PrismaService) { }

  async criarTurma(data: CreateTurmaDto) {
    if (!Number.isInteger(data.idProfessor) || data.idProfessor <= 0) {
      throw new Error('idProfessor deve ser um número inteiro positivo.');
    }
    const professorExistente = await this.prisma.professor.findUnique({
      where: { id: data.idProfessor },
    });

    if (!professorExistente) {
      throw new Error('Professor não encontrado no banco de dados.')
    }

    if (!Number.isInteger(data.idDisciplina) || data.idDisciplina <= 0) {
      throw new Error('idDisciplina deve ser um número inteiro positivo.');
    }
    const disciplinaExistente = await this.prisma.disciplina.findUnique({
      where: { id: data.idDisciplina },
    });

    if (!disciplinaExistente) {
      throw new Error('Disciplina não encontrada no banco de dados.')
    }

    if (data.horarioTurno && !/^[1-7][1-3]$/.test(data.horarioTurno)) {
      throw new Error(
        'O horarioTurno deve estar no formato diaSemana/turno (ex: 33 para terça-feira (3) de noite (3))',
      );
    }

    if (data.anoSemestre && !/^\d{4}\/[1-2]$/.test(data.anoSemestre)) {
      throw new Error(
        'O anoSemestre deve estar no formato YYYY/S (ex: 2024/2, ano 2024, segundo semestre)',
      );
    }

    if (!Number.isInteger(data.numVagas) || data.numVagas < 0) {
      throw new Error('O número de vagas deve ser um inteiro maior ou igual a 0.');
    }

    return {
      message: "Turma criada com sucesso!",
      turma: data
    }
  }

  async listarTodasAsTurmas(): Promise<Turma[]> {
    try {
      return await this.prisma.turma.findMany();
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

  async atualizarTurma(id: number, updateTurmaDto: UpdateTurmaDto) {
    try {
      const updatedTurma = await this.prisma.turma.update({
        where: { id },
        data: updateTurmaDto,
      });
      return updatedTurma;
    } catch (error) {
      throw new Error(`Erro ao atualizar a turma: ${error.message}`);
    }
    
  }

  async removerTurma(id: number) {
    try {
      return await this.prisma.turma.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao remover a turma: ${error.message}`);
    }
  }
}