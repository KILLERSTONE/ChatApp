import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './Models/Message';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor(private router: Router,private authService:AuthService) {
    // Subscribe to the userLoggedIn event
    this.subscribeToUserLoggedIn();
  }

  private subscribeToUserLoggedIn(): void {
    // Subscribe to the userLoggedIn event emitted by AuthService or any other service
    // This event should be emitted upon successful login
    // Adjust the event name and source accordingly
    this.authService.userLoggedIn.subscribe((token: string) => {
      if (token) {
        // If token exists, initiate socket connection with authentication
        this.initSocket();
      } else {
        // If token is null or undefined, redirect to login page
        this.router.navigateByUrl('/login');
      }
    });
  }

  private initSocket(): void {
    // Initiate socket connection with authentication using the provided token
    this.socket = io('http://localhost:5000');

    // Handle socket connection errors
    this.socket.on('connect_error', () => {
      console.error('Socket connection error');
      // Redirect to login page if there's a connection error
      this.router.navigateByUrl('/login');
    });
  }

  sendMessage(message: Message): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('sendMessage', message);
    } else {
      console.error('Socket is not connected');
    }
  }

  receiveMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.socket.on('receiveMessage', (message: Message) => {
        observer.next(message);
      });
    });
  }
}
