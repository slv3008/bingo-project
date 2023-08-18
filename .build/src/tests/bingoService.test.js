"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bingoService_1 = require("../services/bingoService");
const game_1 = require("../models/game");
describe('Bingo Service tests', () => {
    // Test para generateNumber
    test('Should generate a number within a given range', () => {
        const number = (0, bingoService_1.generateNumber)(1, 75);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(75);
    });
    // Test para generateBingoCard
    test('Should generate a valid bingo card', () => {
        const card = (0, bingoService_1.generateBingoCard)();
        expect(card.B.length).toBe(5);
        expect(card.I.length).toBe(5);
        expect(card.N.length).toBe(5);
        expect(card.G.length).toBe(5);
        expect(card.O.length).toBe(5);
    });
    // Test para generateUniqueNumbers
    test('Should generate a set of unique numbers', () => {
        const numbers = (0, bingoService_1.generateUniqueNumbers)(5, 1, 75);
        const setOfNumbers = new Set(numbers);
        expect(numbers.length).toBe(setOfNumbers.size); // Comprueba que todos los números son únicos
    });
    // Test para callBingoNumber
    test('Should call a unique bingo number', () => {
        const game = new game_1.Game("test-game");
        const firstNumber = (0, bingoService_1.callBingoNumber)(game);
        const secondNumber = (0, bingoService_1.callBingoNumber)(game);
        expect(firstNumber).not.toBe(secondNumber);
        expect(game.calledNumbers.includes(firstNumber)).toBe(true);
        expect(game.calledNumbers.includes(secondNumber)).toBe(true);
    });
    // Test para checkBingo
    test('Should correctly verify bingo', () => {
        const card = (0, bingoService_1.generateBingoCard)();
        const calledNumbers = [...card.B, ...card.I, card.N[0], card.N[1], card.N[3], ...card.G, ...card.O].filter((num) => num !== null);
        const hasBingo = (0, bingoService_1.checkBingo)(card, calledNumbers);
        expect(hasBingo).toBe(true);
    });
});
