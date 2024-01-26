import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import {
  Ires,
  SessionserviceService,
} from '../../services/sessionservice.service';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-startgame',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [SessionserviceService],
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.scss'],
})
export class StartgameComponent {
  sessionId: string = '';
  sessionIdFrom: string = '';
  userInput: string = '';
  gameResultMessage: string = '';
  gameResultStatus: string = 'Not Started';
  errorMessage: string = '';
  attempts: number = 0;
  constructor(private sessionService: SessionserviceService) {}

  getSessionId() {
    this.sessionService.getSessionId().subscribe((response: string) => {
      if (this.attempts < 9) {
        this.sessionId = response;
        this.sessionIdFrom = '';
        this.userInput = '';
        this.gameResultStatus = 'Not Started';
        this.gameResultMessage = '';
        console.log('Session ID : ' + this.sessionId);
      } else {
        this.clearFields();
      }
    });
  }

  makeGuess() {
    this.sessionService.makeGuess(this.sessionId, this.userInput).subscribe(
      (results: Ires) => {
        this.gameResultMessage = results.message;
        this.gameResultStatus = results.status;
        this.userInput = '';
        this.errorMessage = '';
        this.attempts++;
        if (this.attempts >= 8) {
          this.clearFields();
        }
        console.log(results);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }

  clearFields() {
    this.sessionId = '';
    this.userInput = '';
  }
}
