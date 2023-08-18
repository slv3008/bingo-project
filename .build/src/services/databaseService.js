"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalledNumbers = exports.callNumber = exports.getCard = exports.saveCard = exports.getGame = exports.saveGame = void 0;
const db_1 = require("./db");
async function saveGame(game) {
    const text = 'INSERT INTO bingo_games(id) VALUES($1) RETURNING *';
    const values = [game.id];
    await (0, db_1.query)(text, values);
}
exports.saveGame = saveGame;
async function getGame(id) {
    const text = 'SELECT * FROM bingo_games WHERE id = $1';
    const values = [id];
    const result = await (0, db_1.query)(text, values);
    return result.rows[0];
}
exports.getGame = getGame;
async function saveCard(card, gameId) {
    const text = `INSERT INTO bingo_cards(game_id, B, I, N, G, O) 
                VALUES($1, $2, $3, $4, $5, $6) 
                RETURNING *`;
    const values = [gameId, card.B, card.I, card.N, card.G, card.O];
    await (0, db_1.query)(text, values);
}
exports.saveCard = saveCard;
async function getCard(id) {
    const text = 'SELECT * FROM bingo_cards WHERE id = $1';
    const values = [id];
    const result = await (0, db_1.query)(text, values);
    return result.rows[0];
}
exports.getCard = getCard;
async function callNumber(gameId, number) {
    const text = 'INSERT INTO bingo_called_numbers(game_id, number) VALUES($1, $2) RETURNING *';
    const values = [gameId, number];
    await (0, db_1.query)(text, values);
}
exports.callNumber = callNumber;
async function getCalledNumbers(gameId) {
    const text = 'SELECT number FROM bingo_called_numbers WHERE game_id = $1 ORDER BY called_at ASC';
    const values = [gameId];
    const result = await (0, db_1.query)(text, values);
    return result.rows.map(row => row.number);
}
exports.getCalledNumbers = getCalledNumbers;
