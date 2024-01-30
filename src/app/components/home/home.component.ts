import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SessionserviceService } from '../../services/sessionservice.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [SessionserviceService, AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  errorMessageSession: string = '';
  attempts: number = 0;
  sessionId: string = '';
  gameResultMessage: string = '';
  sessionIdFrom: string = '';
  gameResultStatus: string = 'Not Started';

  constructor(
    private sessionService: SessionserviceService,
    private authService: AuthService,
    private router: Router
  ) {}

  getSessionId() {
    if (this.authService.getToken()) {
      this.sessionService.getSessionId().subscribe((response: string) => {
        this.sessionId = response;
        this.router.navigate(['/startgame'], {
          queryParams: { sessionId: this.sessionId },
        });
      });
    } else {
      let seconds = 5;
      const updateTimer = () => {
        seconds--;
        if (seconds > 0) {
          this.errorMessageSession = `Please Sign in or Sign up first ! ,  ${seconds}`;
          setTimeout(updateTimer, 1000);
        } else {
          this.router.navigate(['/registration']);
        }
      };

      updateTimer();
    }
  }
}
