import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const randomUuidv4 = uuidv4();
var currentStatus;

const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.send(currentStatus);
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});

const showRandomString = () => {

  const now = new Date();
  const timestampNow = now.toISOString();
  currentStatus = `${timestampNow}: ${randomUuidv4}`;
  console.log(currentStatus);
  setTimeout(showRandomString, 5000);
}

showRandomString();
