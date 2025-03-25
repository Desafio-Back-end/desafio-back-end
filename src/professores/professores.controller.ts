import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';
import { Public } from 'src/auth/public.decorator';


@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) { }

  @Post()
  @Public()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professoresService.create(createProfessorDto);
  }


  @Get()
  findAll() {
    return this.professoresService.findAll();
  }

  @TipoUsuarios(TipoUsuario.Professor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.professoresService.findOne(+id);
  }

  @TipoUsuarios(TipoUsuario.Professor)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professoresService.update(+id, updateProfessorDto);
  }

  @TipoUsuarios(TipoUsuario.Professor)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.professoresService.remove(+id);
  }
}
