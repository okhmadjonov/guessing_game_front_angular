import { Component, Inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSignIn() {
    this.authService.signIn(this.email, this.password).subscribe(
      (response) => {
        const token = response?.token;

        if (token) {
          this.authService.setToken(token);
          console.log('Token: ' + token);
          this.email = '';
          this.password = '';
        } else {
          console.error('Invalid response or missing token.');
        }
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
