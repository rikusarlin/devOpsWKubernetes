import express from 'express';
import fs from 'fs';
import path from 'path';

const directory = path.join('/', 'tmp', 'ping-pong');
const filePathHits = path.join(directory, 'hits.txt');

const app = express();
const port = 3001;

async function fileAlreadyExists(fileName) {
  try {
    await fs.promises.access(fileName, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const writeStringToFile = (filePath, stringToWrite) => {
  fs.writeFileSync(filePath, stringToWrite, function(err) {
    if(err) {
        return console.log(err);
    }
})}; 

app.get('/pingpong', async function(req, res) {
  var currentHits=0;
  const hitsFileExists = await fileAlreadyExists(filePathHits);
  if(hitsFileExists){
    currentHits = parseInt(await fs.promises.readFile(filePathHits));
  }
  currentHits++;
  res.send(`pong ${currentHits}`);
  writeStringToFile(filePathHits, currentHits+"");  
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});
