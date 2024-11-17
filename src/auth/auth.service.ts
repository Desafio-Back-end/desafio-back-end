import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsuariosService, private jwtService: JwtService) { }

    /*MÉTODO PARA LOGAR USUÁRIO
    ELE BUSCA O USUÁRIO POR EMAIL, VALIDA A SENHA E RETORNA O TOKEN*/
    async logar(email: string, senhaInformada: string): Promise<{ access_token: string }> {
        const user = await this.userService.obterUsuarioPorEmail(email);
        if (user?.senha !== senhaInformada) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email, tipoUsuario: user.tipoUsuario };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
