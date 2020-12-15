import { Body, Controller, Post } from '@nestjs/common';
import { HookRequestDto } from './dto/HookRequest.dto';
import { WebhookService } from './webhook.service';


@Controller('webhook')
export class WebhookController {
    constructor(private webhookSerivce: WebhookService) { }
    @Post()
    hook(@Body() hookRequestDto: HookRequestDto): void {
        this.webhookSerivce.updateOrderStatus(hookRequestDto);
    }
}
