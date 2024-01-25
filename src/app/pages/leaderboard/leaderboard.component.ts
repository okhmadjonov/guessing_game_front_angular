import { FetchleaderboarddataService } from './../../services/fetchleaderboarddata.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [FetchleaderboarddataService, AuthService],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  users: User[] = [];

  constructor(private fetData: FetchleaderboarddataService) {}

  ngOnInit(): void {
    this.fetData.getLeaderBoardData().subscribe((data: User[]) => {
      this.users = data;
      console.log('Users: ', this.users);
    });
  }
}
