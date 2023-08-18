export class Card {
  id: string;
  B: (number | null)[];
  I: (number | null)[];
  N: (number | null)[];
  G: (number | null)[];
  O: (number | null)[];

  constructor(id: string) {
    this.id = id;
    this.B = [];
    this.I = [];
    this.N = [];
    this.G = [];
    this.O = [];
  }
}
