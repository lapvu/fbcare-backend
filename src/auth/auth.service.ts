import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/Login.dto';
import { RegisterDto } from './dtos/Register.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.usersService.findUserByPhoneOrEmail(loginDto.identifier);

        if (!user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: {
                    message: `email/phone or password does not match!`
                },
            }, HttpStatus.FORBIDDEN);
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password)

        if (!isMatch) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: {
                    message: `email/phone hoặc mật khẩu không đúng!`
                },
            }, HttpStatus.FORBIDDEN);
        }

        const { display_name, roles, _id, group_id, } = user;

        return {
            success: true,
            data: {
                access_token: this.jwtService.sign({ display_name, roles, user_id: _id, group_id }),
            }
        };
    }

    async register(registerDto: RegisterDto): Promise<any> {
        try {
            const user = await this.usersService.createNewUser(registerDto);
            const { display_name, roles, _id, group_id } = user;
            return {
                success: true,
                data: {
                    access_token: this.jwtService.sign({ display_name, roles, user_id: _id, group_id }),
                }
            };
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: {
                        name: Object.keys(error.keyPattern)[0],
                        message: `${Object.keys(error.keyPattern)[0]} đã tồn tại!`
                    },
                }, HttpStatus.FORBIDDEN);
            }
        }
    }
}