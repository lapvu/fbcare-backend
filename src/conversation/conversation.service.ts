import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from './dtos/MessageDto.dto';
import { QueryMessageDto } from './dtos/QueryMessage.dto';
import { Conversation, ConversationDocument } from './models/conversation.model';

@Injectable()
export class ConversationService {
    constructor(@InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>) { }

    async saveMessage(messageDto: MessageDto): Promise<any> {
        const conversation = await this.conversationModel.updateOne({
            recipient: messageDto.recipient,
            sender: messageDto.sender,
            nmsg: { $lt: 200 }
        },
            {
                $push: {
                    messages: {
                        text: messageDto.text,
                        time: messageDto.time,
                        mid: messageDto.mid,
                        is_echo: messageDto.is_echo
                    }
                },
                $min: { first: messageDto.time },
                $max: { last: messageDto.time },
                $inc: { nmsg: 1 }
            }, { upsert: true }).exec();
        return conversation;
    }

    async getConversations(): Promise<any> {
        return;
    }

    async getMessages(queryMessageDto: QueryMessageDto): Promise<any> {
        const conversations = await this.conversationModel.find({
            sender: queryMessageDto.sender,
            recipient: queryMessageDto.recipient,
        }).exec();
        return conversations;
    }
}
