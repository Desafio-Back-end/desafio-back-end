import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    // MÉTODO DE LOGIN
    logar(@Body() logar: Record<string, any>) {
        return this.authService.logar(logar.email, logar.senhaInformada);
    }
    // MÉTODO PARA OBTER O PERFIL DO USUÁRIO, A PARTIR DO TOKEN
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}

