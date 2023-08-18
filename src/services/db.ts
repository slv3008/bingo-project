import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: '172.29.48.1', 
  database: 'test',
  password: 'admin',
  port: 5432,
});

export const query = (text: string, params: any[]) => pool.query(text, params);
