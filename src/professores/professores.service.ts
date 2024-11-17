import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessoresService {
  constructor(private readonly prisma: PrismaService) {   
  }

  create(createProfessorDto: CreateProfessorDto) {
    return this.prisma.professor.create({
      data: { idUsuario: createProfessorDto.idUsuario},
    });  
  }

  findAll() {
    return this.prisma.professor.findMany();
  }  
    
  findOne(id: number) {
    return this.prisma.professor.findUnique({
      where: { id },
    }); 
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return this.prisma.professor.update({
      where: { id },
      data: { idUsuario: updateProfessorDto.idUsuario},
    });   
  }

  remove(id: number) {
    return this.prisma.professor.delete({
      where: { id },
    });
  }
}
