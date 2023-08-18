CREATE TABLE bingo_games (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT current_timestamp,
    finished BOOLEAN DEFAULT false
);

CREATE TABLE bingo_cards (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES bingo_games(id),
    B INTEGER[],
    I INTEGER[],
    N INTEGER[],
    G INTEGER[],
    O INTEGER[]
);

CREATE TABLE bingo_called_numbers (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES bingo_games(id),
    number INTEGER CHECK (number >= 1 AND number <= 75),
    called_at TIMESTAMP DEFAULT current_timestamp
);

-- Índice para una búsqueda más rápida de números llamados por juego
CREATE INDEX idx_game_number ON bingo_called_numbers (game_id, number);
