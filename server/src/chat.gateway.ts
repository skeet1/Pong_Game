import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateway{
@WebSocketServer()
server: Server;


@SubscribeMessage('message')
handleMessage(@MessageBody() message : string) : void 
{
    console.log("in server", message);
    
    this.server.emit('message', message);
}  
}