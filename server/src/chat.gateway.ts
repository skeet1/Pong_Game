import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    users: number = 0;

  handleDisconnect(client: Socket) {
      console.log(`Client disconnected  id id ${client.id}`);
      
  }
  handleConnection(client: Socket) {
    console.log(`Client connected id id ${client.id}`);
  }

  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('in server', message);
    this.server.emit('message', message);
  }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, roomName: string)
//   {
//     if (this.users < 2)
//     {
//         this.users++;
//         client.join(roomName);
//         console.log(`Client ${client.id} joined room ${roomName}`);
//     }
//     else    
//         console.log(`Room ${roomName} is full. Cannot join.`);
//     }

}
