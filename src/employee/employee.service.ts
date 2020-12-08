import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';

@Injectable()
export class EmployeeService {
    constructor(private userService: UserService) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto, group_id: string): Promise<any> {
        try {
            const employee = await this.userService.createNewEmployee(createEmployeeDto, group_id);
            return employee;
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

    async getEmployees(getEmployeeDto, group_id: string): Promise<any> {
        const employees = await this.userService.getEmployees(getEmployeeDto, group_id);
        return employees;
    }

    async deleteEmployee(user_id: string, group_id: string): Promise<any> {
        return await this.userService.deleteEmployee(user_id, group_id);
    }
}
