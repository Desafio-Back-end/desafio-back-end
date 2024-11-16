import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Instituicao)
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) { }

  @Post()
  criarTurma(@Body() data: CreateTurmaDto) {
    return this.turmasService.criarTurma(data);
  }

  @Get()
  listarTodasAsTurmas() {
    return this.turmasService.listarTodasAsTurmas();
  }

  @Get(':id')
  buscarTurma(@Param('id') id: string) {
    return this.turmasService.buscarTurma(+id);
  }

  @Patch(':id')
  atualizarTurma(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.atualizarTurma(+id, updateTurmaDto);
  }

  @Delete(':id')
  removerTurma(@Param('id') id: string) {
    return this.turmasService.removerTurma(+id);
  }
}
