export class Game {
  public id: number;
  public attempts: number;
  public win: boolean;
  public description: string[] = [];

  constructor(
    id: number,
    attempts: number,
    win: boolean,
    description: string[]
  ) {
    this.id = id;
    this.attempts = attempts;
    this.win = win;
    this.description = description;
  }
}
