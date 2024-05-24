import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        // Redirect to login page on successful registration
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.error = error.message || 'An error occurred during registration';
      } 
    });
  }
}
