import { Game } from './Game';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public games: Game[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    result: Game[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.games = result;
  }
}
