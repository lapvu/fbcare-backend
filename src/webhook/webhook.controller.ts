import { Controller, Get, Post, Query } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private webhookService: WebhookService) { }
    @Get("webhook")
    async verifyWebhook(@Query() verifyWebhookDto: VerifyWebhookDto): Promise<any> {
        return this.webhookService.verifyWebhook(verifyWebhookDto);
    }

    @Post("webhook")
    async webhook(): Promise<any> {
        return ""
    }
}
