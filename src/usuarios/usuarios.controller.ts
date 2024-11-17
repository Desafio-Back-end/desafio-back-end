import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  /* AQUI USEI O DECORATOR PUBLIC, PARA IDENTIFICAR QUE 
  ESSA ROTA NÃO PRECISA DE AUTENTICAÇÃO*/
  @Public()
  cadastrarUsuario(@Body() usuario: Prisma.UsuarioCreateInput) {
    return this.usuariosService.cadastrarUsuario(usuario);
  }
}
