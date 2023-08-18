import { 
    generateNumber,
    generateBingoCard,
    generateUniqueNumbers,
    callBingoNumber,
    checkBingo
  } from '../services/bingoService';
  import { Game } from '../models/game';
  import { Card } from '../models/card';
  
  describe('Bingo Service tests', () => {
  
    // Test para generateNumber
    test('Should generate a number within a given range', () => {
      const number = generateNumber(1, 75);
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(75);
    });
  
    // Test para generateBingoCard
    test('Should generate a valid bingo card', () => {
      const card = generateBingoCard();
      expect(card.B.length).toBe(5);
      expect(card.I.length).toBe(5);
      expect(card.N.length).toBe(5);
      expect(card.G.length).toBe(5);
      expect(card.O.length).toBe(5);
    });
  
    // Test para generateUniqueNumbers
    test('Should generate a set of unique numbers', () => {
      const numbers = generateUniqueNumbers(5, 1, 75);
      const setOfNumbers = new Set(numbers);
      expect(numbers.length).toBe(setOfNumbers.size);  // Comprueba que todos los números son únicos
    });
  
    // Test para callBingoNumber
    test('Should call a unique bingo number', () => {
      const game = new Game("test-game");
      const firstNumber = callBingoNumber(game);
      const secondNumber = callBingoNumber(game);
      expect(firstNumber).not.toBe(secondNumber);
      expect(game.calledNumbers.includes(firstNumber)).toBe(true);
      expect(game.calledNumbers.includes(secondNumber)).toBe(true);
    });
  
    // Test para checkBingo
    test('Should correctly verify bingo', () => {
        const card: Card = generateBingoCard();
        const calledNumbers: number[] = [...card.B, ...card.I, card.N[0], card.N[1], card.N[3], ...card.G, ...card.O];
        const hasBingo = checkBingo(card, calledNumbers);
        expect(hasBingo).toBe(true);
    });
  });
  