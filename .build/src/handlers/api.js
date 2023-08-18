"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBingo = exports.getNextNumber = exports.getCard = void 0;
const bingoService_1 = require("../services/bingoService");
const game_1 = require("../models/game");
const getCard = async (event, _context) => {
    try {
        const card = (0, bingoService_1.generateBingoCard)();
        return {
            statusCode: 200,
            body: JSON.stringify(card),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
exports.getCard = getCard;
const getNextNumber = async (event, _context) => {
    try {
        const gameId = event.pathParameters?.gameId;
        if (!gameId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Game ID is required" }),
            };
        }
        const game = new game_1.Game(gameId);
        const number = (0, bingoService_1.callBingoNumber)(game);
        return {
            statusCode: 200,
            body: JSON.stringify({ number }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
exports.getNextNumber = getNextNumber;
const verifyBingo = async (event, _context) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const card = body.card;
        const calledNumbers = body.calledNumbers;
        if (!card || !calledNumbers) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Card and called numbers are required" }),
            };
        }
        const hasBingo = (0, bingoService_1.checkBingo)(card, calledNumbers);
        return {
            statusCode: 200,
            body: JSON.stringify({ hasBingo }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
exports.verifyBingo = verifyBingo;
