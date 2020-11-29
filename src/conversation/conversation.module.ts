import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationGateway } from './conversation.gateway';
import { Conversation, ConversationSchema } from './models/conversation.model';

@Module({
  imports:[MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  providers: [ConversationService, ConversationGateway],
  controllers: [ConversationController],
})
export class ConversationModule { }
