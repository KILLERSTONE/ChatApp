import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/users';

  userLoggedIn: EventEmitter<string> = new EventEmitter<string>(); // Define EventEmitter to emit userLoggedIn event

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password }; 
    return this.http.post<User>(`${this.baseUrl}/login`, body);
  }
  
  register(username: string, password: string): Observable<any> {
    const body = { username, password }; 
    return this.http.post<User>(`${this.baseUrl}/register`,body);
  }
  emitUserLoggedIn(token: string): void {
    this.userLoggedIn.emit(token);
  }
}
