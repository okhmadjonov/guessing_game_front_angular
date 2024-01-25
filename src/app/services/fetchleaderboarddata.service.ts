// FetchleaderboarddataService
import { Component, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FetchleaderboarddataService {
  private urlLinkLeaderBoard = 'https://localhost:7025/api/LeaderBoard';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getLeaderBoardData(): Observable<User[]> {
    const token = this.authService.getToken().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(this.urlLinkLeaderBoard, { headers });
  }
}
