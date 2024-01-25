// FetchleaderboarddataService
import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class FetchleaderboarddataService {
  private urlLinkLeaderBoard = 'https://localhost:7025/api/LeaderBoard';

  constructor(private http: HttpClient) {}

  getLeaderBoardData(): Observable<User[]> {
    return this.http.get<User[]>(this.urlLinkLeaderBoard);
  }
}
