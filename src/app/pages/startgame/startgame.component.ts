import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionserviceService } from '../../services/sessionservice.service';
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
export class StartgameComponent implements OnInit {
  sessionId: string = '';
  Userinput: string[] = ['', '', '', ''];
  gameResultMessages: string[] = [];
  gameResultStatus: string = 'Results';
  errorMessage: string = '';
  errorMessageSession: string = '';
  attempts: number = 0;

  constructor(
    private sessionService: SessionserviceService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sessionId = params['sessionId'];
    });
  }

  makeGuess() {
    if (!this.sessionId) {
      this.errorMessage = 'Please, click start button on the home page first!';
      return;
    }

    if (this.Userinput.some((digit) => !/\d/.test(digit))) {
      this.errorMessage = 'All digits must be filled!';
      return;
    }

    if (this.Userinput.some((digit) => digit === '')) {
      this.errorMessage = 'All digits must be filled!';
      return;
    }

    this.errorMessage = '';
    const guessNumber = this.Userinput.join('');

    this.sessionService.makeGuess(this.sessionId, guessNumber).subscribe(
      (results: any) => {
        this.gameResultMessages.push(results.message);
        this.gameResultStatus = results.status;
        console.log('Game Result Message: ' + this.gameResultMessages);
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
          this.errorMessage = error.error;
        }
      }
    );
  }
  onInput(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    event.target.value = value;
    const index = event.target.name.slice(-1);

    this.Userinput[index - 1] = value;
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
    this.Userinput = ['', '', '', ''];
  }
}
