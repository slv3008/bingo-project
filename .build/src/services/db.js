"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: '172.29.48.1',
    database: 'test',
    password: 'admin',
    port: 5432,
});
const query = (text, params) => pool.query(text, params);
exports.query = query;
