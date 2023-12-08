import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  constructor() {
  }

  setupSocketConnection(): void {
    const token = localStorage.getItem('token');

    this.socket = io.connect(environment.SOCKET_ENDPOINT, {transports: ['websocket']});

    console.log(this.socket);
  }
}
