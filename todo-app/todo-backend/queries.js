import { v4 as uuidv4 } from 'uuid';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DB,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT,
});

const getTodo = async (uuid) => {
    try {
        const results = await pool.query('SELECT id, text, completed FROM todo WHERE id=$1', [uuid]);
        return results.rows[0];
    } catch (e){
        console.error(e);
        throw e;
    }
}

const getAllTodos = async () => {
    try {
        const results = await pool.query('SELECT id, text, completed FROM todo');
        return results.rows;
    } catch (e){
        console.error(e);
        throw e;
    }
}

const insertTodo = async (todoText) => {
    try {
        const uuid = uuidv4();
        const completed = false;
        await pool.query('INSERT INTO todo (id, text, completed) VALUES ($1, $2, $3)', [uuid, todoText, completed]);
        return uuid;
    } catch (e){
        console.error(e);
        throw e;
    }
}

export default {
    getTodo,
    getAllTodos,
    insertTodo
}