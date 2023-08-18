export class Card {
    id: string;
    B: number[];
    I: number[];
    N: number[];
    G: number[];
    O: number[];
  
    constructor(id: string) {
      this.id = id;
      this.B = [];
      this.I = [];
      this.N = [];
      this.G = [];
      this.O = [];
    }
  }
  