import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    getInfo(@Request() req) {
        return this.dashboardService.getInfomation(req.user.user_id, req.user.group_id, req.user.roles);
    }
}
