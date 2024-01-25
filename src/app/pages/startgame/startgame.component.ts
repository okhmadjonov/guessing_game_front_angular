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
  userInput: string = '';
  gameResult: any;
  gameResultMessage: string = '';
  gameResultStatus: string = 'Not Started';

  constructor(private sessionService: SessionserviceService) {}

  getSessionId() {
    this.sessionService.getSessionId().subscribe((response: string) => {
      this.sessionId = response;
      console.log('Session ID : ' + this.sessionId);
    });
  }

  makeGuess() {
    this.sessionService.makeGuess(this.sessionId, this.userInput).subscribe(
      (results: Ires) => {
        this.gameResultMessage = results.message;
        this.gameResultStatus = results.status;
        console.log(results);
      },
      (error) => {
        console.log('Error making guess:', error);
      }
    );
  }
}
