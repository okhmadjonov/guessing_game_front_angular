import { Component, Inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  providers: [AuthService, HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn() {
    this.authService.signIn(this.email, this.password).subscribe(
      (response: any) => {
        const token = response.token;
        this.email = response.email;
        if (token && this.email) {
          this.authService.setToken(token, this.email);
          this.email = '';
          this.password = '';
          this.router.navigate(['/']);
        } else {
          console.error('Invalid response or missing token.');
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'User not registered.';
        } else if (error.status === 400) {
          this.handleValidationErrors(error.error.errors);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }

  private handleValidationErrors(errors: any) {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const fieldErrors = errors[key];
        if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
          this.errorMessage += `${fieldErrors[0]}\n`;
        }
      }
    }
  }
}
