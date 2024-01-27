import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Ires,
  SessionserviceService,
} from '../../services/sessionservice.service';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-startgame',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [SessionserviceService, AuthService],
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.scss'],
})
export class StartgameComponent {
  sessionId: string = '';
  sessionIdFrom: string = '';
  Userinput: string = '';
  gameResultMessage: string = '';
  gameResultStatus: string = 'Not Started';
  errorMessage: string = '';
  errorMessageSession: string = '';
  attempts: number = 0;
  checkClickError: string = '';
  constructor(
    private sessionService: SessionserviceService,
    private authService: AuthService,

    private router: Router
  ) {}

  getSessionId() {
    // if (!this.authService.getToken()) {
    //   this.errorMessage = 'Please Sign in or Sign up first!';
    //   setTimeout(() => {
    //     this.router.navigate(['/login']);
    //   }, 3000);
    // }

    if (!this.authService.getToken()) {
      let seconds = 5;
      const updateTimer = () => {
        seconds--;
        if (seconds > 0) {
          this.errorMessageSession = `Please Sign in or Sign up first! ,  ${seconds} seconds...`;
          setTimeout(updateTimer, 1000);
        } else {
          this.router.navigate(['/login']);
        }
      };

      updateTimer();
      console.log('SeessionError: ' + this.errorMessageSession);
      return;
    }

    this.sessionService.getSessionId().subscribe((response: string) => {
      if (this.attempts < 9) {
        this.sessionId = response;
        this.sessionIdFrom = '';
        this.Userinput = '';
        this.gameResultStatus = 'Not Started';
        this.gameResultMessage = '';
        console.log('Session ID : ' + this.sessionId);
      } else {
        this.clearFields();
      }
    });
  }

  makeGuess() {
    if (!this.sessionId) {
      this.errorMessage = 'Please, generate session ID first !';
      return;
    }

    if (!this.Userinput) {
      this.errorMessage = 'Guess number are required.';
      return;
    }

    this.errorMessage = '';
    this.sessionService.makeGuess(this.sessionId, this.Userinput).subscribe(
      (results: Ires) => {
        this.gameResultMessage = results.message;
        this.gameResultStatus = results.status;
        this.attempts++;
        if (this.attempts >= 8) {
          this.clearFields();
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMessage = error.error;
          this.handleValidationErrors(error.error.errors);
        } else {
          // Handle other errors
          this.errorMessage = error.error;
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

  clearFields() {
    this.sessionId = '';
    this.Userinput = '';
  }

  onInputChange(event: any) {
    const enteredValue = event.target.value;
    const pattern = /^[0-9]*$/;
    if (!pattern.test(enteredValue)) {
      this.Userinput = enteredValue.replace(/\D/g, '');
    }
  }
}
