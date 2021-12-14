import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DB,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT,
});

const isConnectionOk = async() => {
    try {
        const conn = await pool.connect();
        conn.release();
        console.log("got connection to db - connection ok");
        return true;
    } catch(e) {
        console.log("could not get connection to db - connection not ok");
        return false;
    }    
}

const getHits = async () => {
    try {
        const results = await pool.query('SELECT hits FROM pingpongdata');
        return results.rows[0].hits;
    } catch (e){
        console.error(e);
        throw e;
    }
}

const updateHits = async () => {
    try {
        await pool.query('UPDATE pingpongdata SET hits=hits+1');
    } catch (e){
        console.error(e);
        throw e;
    }
}

export default {
    getHits,
    updateHits,
    isConnectionOk
}