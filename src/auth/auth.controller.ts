import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { TipoUsuarios } from './tipoUsuario.decorator';
import { TipoUsuario } from 'src/enums/tipoUsuario.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    logar(@Body() logar: Record<string, any>) {
        return this.authService.logar(logar.email, logar.senhaInformada);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}

