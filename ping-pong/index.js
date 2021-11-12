import express from 'express';

var currentHits = 0;

const app = express();
const port = 3001;

app.get('/pingpong', function(req, res) {
  res.send(`pong ${currentHits}`);
  currentHits++;
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});
