import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './Models/Message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:5000/api/chat';

  constructor(private http: HttpClient) {}

  getMessages(conversationId: string): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/messages/${conversationId}`);
  }

  saveMessage(data: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/messages`, data);
  }
}
