import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    users: number;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
    handleMessage(message: string): void;
}
