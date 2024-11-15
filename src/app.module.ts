import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { InstituicoesModule } from './instituicoes/instituicoes.module';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { TurmasModule } from './turmas/turmas.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot(), UsuariosModule, InstituicoesModule, AlunosModule, ProfessoresModule, DisciplinasModule, MatriculasModule, TurmasModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
