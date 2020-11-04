import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CallbackDto } from './dtos/Callback.dto';
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

    @Get("callback")
    async callback(@Query() callbackDto: CallbackDto): Promise<any> {
        return this.authService.callback(callbackDto);
    }
}
