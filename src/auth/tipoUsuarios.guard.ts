
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';
import { TIPO_USUARIO_KEY } from './tipoUsuario.decorator';

@Injectable()
export class TipoUsuariosGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    // ESSE É O GUARD DE AUTORIZAÇÃO
    canActivate(context: ExecutionContext): boolean {
        const requiredTipoUsuarios = this.reflector.getAllAndOverride<TipoUsuario[]>(TIPO_USUARIO_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredTipoUsuarios) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredTipoUsuarios.some((tipoUsuario) => user.tipoUsuario === tipoUsuario);
    }
}
