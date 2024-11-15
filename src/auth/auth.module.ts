import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TipoUsuariosGuard } from './tipoUsuarios.guard';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '120s' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuariosService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, {
      provide: APP_GUARD,
      useClass: TipoUsuariosGuard,
    },
  ],
  exports: [AuthService]
})
export class AuthModule { }
