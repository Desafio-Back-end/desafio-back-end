import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Usuario, Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {

  }
  //MÉTODO PARA CADASTRAR O USUÁRIO
  async cadastrarUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }
  //MÉTODO PARA OBTER USUÁRIO POR EMAIL
  async obterUsuarioPorEmail(email: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: {
        email: email
      }
    });
  }
}
