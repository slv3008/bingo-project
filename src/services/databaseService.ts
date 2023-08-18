import { Card } from '../models/card';
import { query } from './db'; 
import { Game } from '../models/game';

export async function saveGame(game: Game): Promise<void> {
  const text = 'INSERT INTO bingo_games(id) VALUES($1) RETURNING *';
  const values = [game.id];
  await query(text, values);
}

export async function getGame(id: string): Promise<Game> {
  const text = 'SELECT * FROM bingo_games WHERE id = $1';
  const values = [id];
  const result = await query(text, values);
  return result.rows[0];
}

export async function saveCard(card: Card, gameId: number): Promise<void> {
  const text = `INSERT INTO bingo_cards(game_id, B, I, N, G, O) 
                VALUES($1, $2, $3, $4, $5, $6) 
                RETURNING *`;
  const values = [gameId, card.B, card.I, card.N, card.G, card.O];
  await query(text, values);
}

export async function getCard(id: number): Promise<Card> {
  const text = 'SELECT * FROM bingo_cards WHERE id = $1';
  const values = [id];
  const result = await query(text, values);
  return result.rows[0];
}

export async function callNumber(gameId: number, number: number): Promise<void> {
  const text = 'INSERT INTO bingo_called_numbers(game_id, number) VALUES($1, $2) RETURNING *';
  const values = [gameId, number];
  await query(text, values);
}

export async function getCalledNumbers(gameId: number): Promise<number[]> {
  const text = 'SELECT number FROM bingo_called_numbers WHERE game_id = $1 ORDER BY called_at ASC';
  const values = [gameId];
  const result = await query(text, values);
  return result.rows.map(row => row.number);
}
