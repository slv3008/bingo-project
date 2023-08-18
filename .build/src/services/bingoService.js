"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBingo = exports.callBingoNumber = exports.generateUniqueNumbers = exports.generateBingoCard = exports.generateNumber = void 0;
const card_1 = require("../models/card");
function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.generateNumber = generateNumber;
function generateBingoCard() {
    const card = new card_1.Card(Date.now().toString());
    card.B = generateUniqueNumbers(5, 1, 15);
    card.I = generateUniqueNumbers(5, 16, 30);
    card.N = generateUniqueNumbers(4, 31, 45);
    card.G = generateUniqueNumbers(5, 46, 60);
    card.O = generateUniqueNumbers(5, 61, 75);
    card.N.splice(2, 0, null);
    return card;
}
exports.generateBingoCard = generateBingoCard;
function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(generateNumber(min, max));
    }
    return [...numbers];
}
exports.generateUniqueNumbers = generateUniqueNumbers;
function callBingoNumber(game) {
    let number;
    do {
        number = generateNumber(1, 75);
    } while (game.calledNumbers.includes(number));
    game.calledNumbers.push(number);
    return number;
}
exports.callBingoNumber = callBingoNumber;
function checkBingo(card, calledNumbers) {
    const lines = [
        card.B, card.I, card.N, card.G, card.O,
        [card.B[0], card.I[1], card.N[2], card.G[3], card.O[4]],
        [card.B[4], card.I[3], card.N[2], card.G[1], card.O[0]]
    ];
    for (const line of lines) {
        if (line.every(num => num === null || calledNumbers.includes(num))) {
            return true;
        }
    }
    return false;
}
exports.checkBingo = checkBingo;
