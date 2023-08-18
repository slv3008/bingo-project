export class Game {
    id: string;
    calledNumbers: number[];
  
    constructor(id: string) {
      this.id = id;
      this.calledNumbers = [];
    }
  }
  