import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [AuthService, HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.authService.signUp(this.name, this.email, this.password).subscribe(
      (response) => {
        console.log('Reg Data: ' + response);
        this.name = '';
        this.email = '';
        this.password = '';
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.errors) {
          this.handleValidationErrors(error.error.errors);
        } else {
          this.errorMessage = 'An error occurred during registration.';
        }
      }
    );
  }

  private handleValidationErrors(errors: any) {
    this.errorMessage = '';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const fieldErrors = errors[key];
        if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
          this.errorMessage += `${key}: ${fieldErrors[0]}\n`;
        }
      }
    }
  }
}
