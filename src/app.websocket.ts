import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export interface WebSocketEvent<T> {
  event: string;
  data: T;
}

@WebSocketGateway({
  transports: ['websocket'],
  cors: '*',
  namespace: 'socket.io',
})
export class AppWebSocket {
  @WebSocketServer()
  server: Server;

  publish<T>(event: WebSocketEvent<T>) {
    this.server.emit(event.event, event.data);
  }
}
