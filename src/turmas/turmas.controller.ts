import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';


@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) { }

  @TipoUsuarios(TipoUsuario.Instituicao)
  @Post('cadastrar')
  criarTurma(@Body() data: CreateTurmaDto) {
    return this.turmasService.criarTurma(data);
  }

  @Get('listar')
  listarTodasAsTurmas() {
    return this.turmasService.listarTodasAsTurmas();
  }

  @Get('listarTurmasProfessor')
  listarTurmasVinculadasProfessor(@Request() req) {
    return this.turmasService.listarTurmasVinculadasProfessor(req.user.sub);
  }
  
  @TipoUsuarios(TipoUsuario.Instituicao)
  @Get(':id')
  buscarTurma(@Param('id') id: string) {
    return this.turmasService.buscarTurma(+id);
  }
  @TipoUsuarios(TipoUsuario.Instituicao)
  @Patch(':id')
  atualizarTurma(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.atualizarTurma(+id, updateTurmaDto);
  }
  @TipoUsuarios(TipoUsuario.Instituicao)
  @Delete(':id')
  removerTurma(@Param('id') id: string) {
    return this.turmasService.removerTurma(+id);
  }
}
