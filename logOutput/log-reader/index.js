import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

var currentStatus;

const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.send(currentStatus);
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});

const directory = path.join('/', 'tmp');
const filePathTimestamp = path.join(directory, 'timestamp.txt')
const filePathHash = path.join(directory, 'hash.txt')

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

var currentStatus;

const showAndWriteHashAndTimestamp = async () => {
  var hashData;
  var timestamp;
  // Both ends can create random hash, so let us start with that
  const hashFileExists = await fileAlreadyExists(filePathHash);
  if(hashFileExists){
    hashData = await fs.promises.readFile(filePathHash);
  } else {
    hashData = uuidv4();
    writeStringToFile(filePathHash, hashData);
  }
  // This end reads timestamp created by the other end (by default we say it is not defined)
  const timestampFileExists = await fileAlreadyExists(filePathTimestamp);
  if(timestampFileExists){
    timestamp = await fs.promises.readFile(filePathTimestamp);
  } else {
    timestamp = "Timestamp not defined"
  }
  currentStatus = timestamp + " " + hashData;
  console.log(currentStatus);
  setTimeout(showAndWriteHashAndTimestamp, 5000);
};

showAndWriteHashAndTimestamp();
