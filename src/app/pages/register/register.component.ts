import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

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
      (error) => {
        console.log(error);
      }
    );
  }
}
