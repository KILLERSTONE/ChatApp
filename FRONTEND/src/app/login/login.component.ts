import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Define errorMessage property

  constructor(private authService: AuthService, private router: Router, private socketService: SocketService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.authService.emitUserLoggedIn(token);
        this.router.navigateByUrl('/chat');
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'An error occurred during login';
      }
    });
  }
}
