import { Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { MessageDto } from 'src/conversation/dtos/MessageDto.dto';
import { EventsHookPayloadDto, Entry, Messaging } from './dto/events.dto';
import { VerifyWebhookDto } from './dto/verify.dto';

@Injectable()
export class WebhookService {
    constructor(private readonly nestEventEmitter: NestEventEmitter) { }

    verifyWebhook(verifyWebhookDto: VerifyWebhookDto): string {
        if (verifyWebhookDto["hub.verify_token"] === "mytoken") {
            return verifyWebhookDto["hub.challenge"];
        }
    }

    handleEventHook(eventsHookPayloadDto: EventsHookPayloadDto): void {

        if (eventsHookPayloadDto.object === "page") {
            eventsHookPayloadDto.entry.forEach((entry: Entry) => {
                entry.messaging.forEach((message: Messaging) => {
                    if (message.message) {
                        const msg: MessageDto = {
                            recipient: message.recipient.id,
                            sender: message.recipient.id,
                            text: message.message.text,
                            time: message.timestamp,
                            mid: message.message.mid,
                            is_echo: message.message.is_echo,
                        };
                        this.nestEventEmitter.emit("sendMessage", msg)
                    }
                })
            })
        }
    }
}
