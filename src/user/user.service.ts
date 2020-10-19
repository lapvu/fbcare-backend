import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findUserByUsernameOrEmail(): Promise<any> {
        this.userModel
    }

    async createNewUser():Promise<any>{
        this.userModel.create()
    }
}
