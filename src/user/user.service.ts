import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/Register.dto';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findUserByPhoneOrEmail(identifier: string): Promise<UserDocument> {
        return await this.userModel.findOne({ $or: [{ email: identifier }, { phone: identifier }] }).exec();
    }

    async createNewUser(user: RegisterDto): Promise<UserDocument> {
        return await this.userModel.create(user)
    }
}
