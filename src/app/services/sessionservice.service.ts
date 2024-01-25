import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SessionserviceService {
  private sessionUrl = 'https://localhost:7025/api/Game';
  constructor(private http: HttpClient) {}

  getSessionId(): Observable<string> {
    return this.http.get<string>(this.sessionUrl);
  }
}
