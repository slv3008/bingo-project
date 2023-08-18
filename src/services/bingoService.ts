import { Card } from "../models/card";
import { Game } from "../models/game";


export function generateNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateBingoCard(): Card {
  const card = new Card(Date.now().toString());
  card.B = generateUniqueNumbers(5, 1, 15);
  card.I = generateUniqueNumbers(5, 16, 30);
  card.N = generateUniqueNumbers(4, 31, 45);
  card.G = generateUniqueNumbers(5, 46, 60);
  card.O = generateUniqueNumbers(5, 61, 75);
  card.N.splice(2, 0, null); 
  return card;
}

export function generateUniqueNumbers(count: number, min: number, max: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(generateNumber(min, max));
  }
  return [...numbers];
}

export function callBingoNumber(game: Game): number {
  let number: number;
  do {
    number = generateNumber(1, 75);
  } while (game.calledNumbers.includes(number));
  game.calledNumbers.push(number);
  return number;
}

export function checkBingo(card: Card, calledNumbers: number[]): boolean {
  const lines = [
    card.B, card.I, card.N, card.G, card.O,
    [card.B[0], card.I[1], card.N[2], card.G[3], card.O[4]],
    [card.B[4], card.I[3], card.N[2], card.G[1], card.O[0]]
  ];

  for (const line of lines) {
    if (line.every(num => num === null || calledNumbers.includes(num as number))) {
      return true;
    }
  }
  return false;
}

