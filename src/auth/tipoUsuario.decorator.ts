//ESSE É O DECORATOR DE AUTORIZAÇÃO
import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '../enums/tipoUsuario.enum';

export const TIPO_USUARIO_KEY = 'tipoUsuario';
export const TipoUsuarios = (...tipoUsuarios: TipoUsuario[]) => SetMetadata(TIPO_USUARIO_KEY, tipoUsuarios);
