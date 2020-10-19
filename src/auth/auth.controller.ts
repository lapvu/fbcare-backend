import { Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) { }
    @Post("login")
    async login(): Promise<any> {
        return await this.userService.createNewUser()
    }
}
