import { Body, Controller, Get, Post, UseGuards, Request, Param, Delete, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { GetEmployeeDto } from './dtos/GetEmployees.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req): Promise<any> {
        return this.employeeService.createEmployee(createEmployeeDto, req.user.group_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getEmployees(@Param() getEmployeeDto: GetEmployeeDto, @Request() req): Promise<any> {
        return this.employeeService.getEmployees(getEmployeeDto, req.user.group_id, req.user.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteEmployee(@Query() query, @Request() req): Promise<any> {
        return this.employeeService.deleteEmployee(query.id, req.user.group_id);
    }
}
