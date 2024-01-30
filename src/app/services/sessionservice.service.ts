import { Injectable } from '@angular/core';
export interface Ires {
  status: string;
  message: string;
}
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class SessionserviceService {
  private sessionUrl = 'https://localhost:7025/api/Game';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSessionId(): Observable<string> {
    const token = this.authService.getToken().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string>(this.sessionUrl, { headers });
  }

  makeGuess(sessionId: string, userInput: string): Observable<Ires> {
    const url = `https://localhost:7025/api/Game/guess/${sessionId}?userInput=${userInput}`;
    const token = this.authService.getToken().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Ires>(url, null, { headers });
  }
}
