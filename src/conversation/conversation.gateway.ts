import { WebSocketGateway, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Logger } from "@nestjs/common"
import { Socket, Server } from 'socket.io';
import { On } from 'nest-event';
import { ConversationService } from './conversation.service';
import { MessageDto } from './dtos/MessageDto.dto';


@WebSocketGateway(3001)
export class ConversationGateway implements OnGatewayDisconnect, OnGatewayInit, OnGatewayConnection {
  constructor(private readonly conversationService: ConversationService) { }

  @WebSocketServer()
  private server: Server;

  private logger: Logger = new Logger("Gateways")

  handleDisconnect(client: Socket) {
    client.emit("abc", "abc")
  }

  afterInit() {
    this.logger.log("Websocket Init");
  }

  handleConnection(client: Socket) {
    this.logger.log(client.id)
    client.emit("connected", { data: "avc" });
  }

  @On("sendMessage")
  async sendMessage(messageDto: MessageDto): Promise<any> {
    // const conversation = await this.conversationService.saveMege(messageDto);
    this.server.emit("sendMessage", messageDto)
  }
}
