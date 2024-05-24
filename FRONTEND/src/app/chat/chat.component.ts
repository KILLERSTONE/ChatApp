import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Message } from '../Models/Message'; // Import Message interface

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe((message) => {
      this.messages.push(message);
      console.log('Received message from user:', message.message); // Access user ID
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const formattedMessage: Message = {
        message: this.newMessage,
        timestamp: new Date(), // Add timestamp before sending
      };
      this.socketService.sendMessage(formattedMessage);
      this.newMessage = '';
    }
  }
}
