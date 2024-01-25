import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';
import { SessionserviceService } from '../../services/sessionservice.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-startgame',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [SessionserviceService, NgModel],
  templateUrl: './startgame.component.html',
  styleUrl: './startgame.component.scss',
})
export class StartgameComponent {
  sessionId: string = '';

  constructor(private sessionService: SessionserviceService) {}

  getSessionId() {
    this.sessionService.getSessionId().subscribe((response: string) => {
      this.sessionId = response;

      console.log('Session ID : ' + this.sessionId);
    });
  }
}

// https://localhost:7025/api/Game
