import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisciplinasService } from './disciplinas.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Instituicao)
@Controller('disciplinas')
export class DisciplinasController {
  constructor(private readonly disciplinasService: DisciplinasService) { }

  @Post()
  create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinasService.create(createDisciplinaDto);
  }

  @TipoUsuarios(TipoUsuario.Instituicao)
  @TipoUsuarios(TipoUsuario.Professor)
  @Get()
  findAll() {
    return this.disciplinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisciplinaDto: UpdateDisciplinaDto) {
    return this.disciplinasService.update(+id, updateDisciplinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinasService.remove(+id);
  }
}
