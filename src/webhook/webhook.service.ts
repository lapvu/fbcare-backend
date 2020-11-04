import { Injectable } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify.dto';

@Injectable()
export class WebhookService {
    async verifyWebhook(verifyWebhookDto: VerifyWebhookDto): Promise<any> {
        if (verifyWebhookDto["hub.verify_token"] === "mytoken") {
            return verifyWebhookDto["hub.challenge"];
        }
    }
}
