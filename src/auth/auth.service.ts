import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsuariosService, private jwtService: JwtService) { }

    //MÉTODO PARA LOGAR USUÁRIO
    async logar(email: string, senhaInformada: string): Promise<{ access_token: string }> {
        const user = await this.userService.obterUsuarioPorEmail(email);
        if (user?.senha !== senhaInformada) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email, tipoUsuario: user.tipoUsuario };
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
