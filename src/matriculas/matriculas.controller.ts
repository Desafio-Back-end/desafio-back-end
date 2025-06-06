import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { TipoUsuarios } from 'src/auth/tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@TipoUsuarios(TipoUsuario.Aluno)
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) { }

  @Post('cadastro')
  criaMatricula(@Body() data: CreateMatriculaDto, @Request() req) {
    return this.matriculasService.criarMatricula(data, req.user.sub);
  }

  @Get('listar')
  listarTodasAsMatriculas() {
    return this.matriculasService.listarTodasAsMatriculas();
  }

  @Get('listarMatriculasAluno')
  listarTodasAsMatriculasPorAluno(@Request() req) {
    return this.matriculasService.listarTodasAsMatriculasAluno(req.user.sub);
  }

  @Get(':id')
  buscarMatricula(@Param('id') id: string) {
    return this.matriculasService.buscarMatricula(+id);
  }

  @Patch(':id')
  atualizarMatricula(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculasService.atualizarMatricula(+id, updateMatriculaDto);
  }

  @Delete(':id')
  removerMatricula(@Param('id') id: string) {
    return this.matriculasService.removerMatricula(+id);
  }
}
