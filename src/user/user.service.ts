import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/Register.dto';
import { CreateEmployeeDto } from 'src/employee/dtos/CreateEmployee.dto';
import { GetEmployeeDto } from 'src/employee/dtos/GetEmployees.dto';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findUserByPhoneOrEmail(identifier: string): Promise<UserDocument> {
        return await this.userModel.findOne({ $or: [{ email: identifier }, { phone: identifier }] }).exec();
    }

    async createNewUser(registerDto: RegisterDto): Promise<UserDocument> {
        const user = await this.userModel.create(registerDto);
        await this.userModel.updateOne({ _id: user._id }, { group_id: user._id });
        user.group_id = user._id;
        return user;
    }

    async createNewEmployee(createEmployeeDto: CreateEmployeeDto, group_id: string): Promise<any> {
        const user = await this.userModel.create({ ...createEmployeeDto, group_id, roles: ["employee"] });
        return user;
    }

    async getEmployees(getEmployeeDto: GetEmployeeDto, group_id: string): Promise<any> {
        const employees = await this.userModel.find({ group_id, _id: { $ne: Types.ObjectId(group_id) } },
            {
                display_name: 1,
                _id: 1,
                email: 1,
                phone: 1
            })
            .skip(+getEmployeeDto.offset)
            .limit(+getEmployeeDto.limit)
            .sort({ "updatedAt": -1 });
        const total = await this.userModel.count({ group_id, _id: { $ne: Types.ObjectId(group_id) } });
        return { employees, total };
    }

    async deleteEmployee(user_id: string, group_id: string): Promise<any> {
        const done = await this.userModel.remove({ user_id, group_id });
        return done;
    }

    async countEmployee(group_id: string): Promise<any> {
        const total = await this.userModel.count({ group_id, _id: { $ne: Types.ObjectId(group_id) } });
        return total;
    }

    async me(user_id: string): Promise<any> {
        const user = await this.userModel.findOne({ _id: user_id }, { password: 0 });
        return user;
    }
}
