import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/Login.dto';
import { RegisterDto } from './dtos/Register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authService.login(loginDto);
    }

    @Post("register")
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.register(registerDto);
    }
}
