import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
constructor(private readonly prisma: PrismaService) {}

  create(createDisciplinaDto: CreateDisciplinaDto) {
    return this.prisma.disciplina.create({
      data: {
        nome: createDisciplinaDto.nome,
        preRequisito: createDisciplinaDto.preRequisito,
      },
    });
  }

  findAll() {
    return this.prisma.disciplina.findMany();
  }

  findOne(id: number) {
    return this.prisma.disciplina.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    return this.prisma.disciplina.update({
      where: { id },
      data: updateDisciplinaDto,
    });
  }

  remove(id: number) {
    return this.prisma.disciplina.delete({
      where: { id },
    });
  }
}
