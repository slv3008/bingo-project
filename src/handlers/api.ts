import { APIGatewayProxyHandler } from "aws-lambda";
import { 
    generateBingoCard, 
    callBingoNumber, 
    checkBingo 
} from "../services/bingoService";
import { Game } from "../models/game";
import { Card } from "../models/card";

export const getCard: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const card = generateBingoCard();
    return {
      statusCode: 200,
      body: JSON.stringify(card),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const getNextNumber: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const gameId = event.pathParameters?.gameId;
    if (!gameId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Game ID is required" }),
      };
    }
    
    const game = new Game(gameId); 
    const number = callBingoNumber(game);
    return {
      statusCode: 200,
      body: JSON.stringify({ number }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const verifyBingo: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const card: Card = body.card;
    const calledNumbers: number[] = body.calledNumbers;

    if (!card || !calledNumbers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Card and called numbers are required" }),
      };
    }

    const hasBingo = checkBingo(card, calledNumbers);
    return {
      statusCode: 200,
      body: JSON.stringify({ hasBingo }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
