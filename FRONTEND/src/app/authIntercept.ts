import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modify request if needed, for example, add authorization headers
    const modifiedRequest = request.clone({
      // headers: request.headers.set('Authorization', 'Bearer your-token-here')
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized: token expired or invalid
          localStorage.removeItem('token'); // Clear token
          this.router.navigate(['/login']); // Redirect to login page
        }
        return throwError(error);
      })
    );
  }
}
