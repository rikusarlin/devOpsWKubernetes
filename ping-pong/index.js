import express from 'express';
import db from './queries.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/pingpong', async function(req, res) {
  await db.updateHits();
  const currentHits = await db.getHits();
  console.log("currentHits from db:"+currentHits);
  res.send(`pong ${currentHits}`);
});

app.get('/hits', async function(req, res) {
  console.log("POSTGRE_HOST: "+process.env.POSTGRE_HOST);
  console.log("POSTGRE_PORT: "+process.env.POSTGRE_PORT);
  console.log("POSTGRE_DB: "+process.env.POSTGRE_DB);
  console.log("POSTGRE_USER: "+process.env.POSTGRE_USER);
  console.log("POSTGRE_PASSWORD: "+process.env.POSTGRE_PASSWORD);
  const currentHits= await db.getHits();
  console.log("currentHits from db:"+JSON.stringify(currentHits));
  res.send(`${currentHits}`);  
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});
