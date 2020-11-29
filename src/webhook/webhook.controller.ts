import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsHookPayloadDto } from './dto/events.dto';
import { VerifyWebhookDto } from './dto/verify.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private webhookService: WebhookService) { }
    @Get()
    verifyWebhook(@Query() verifyWebhookDto: VerifyWebhookDto): string {
        return this.webhookService.verifyWebhook(verifyWebhookDto);
    }

    @Post()
    webhook(@Body() eventsHookPayloadDto: EventsHookPayloadDto): any {
        this.webhookService.handleEventHook(eventsHookPayloadDto);
        return { success: true }
    }
}