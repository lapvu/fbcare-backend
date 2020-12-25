import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SaveSettingDto } from './dtos/SaveSetting.dto';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
    constructor(private transportService: TransportService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    saveSetting(@Body() saveSettingDto: SaveSettingDto, @Request() req) {
        return this.transportService.saveSetting(saveSettingDto, req.user.group_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getSetting(@Request() req) {
        return this.transportService.getSetting(req.user.group_id);
    }
}
