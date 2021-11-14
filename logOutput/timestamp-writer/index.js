import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const directory = path.join('/', 'tmp', 'timestamp');
const filePathTimestamp = path.join(directory, 'timestamp.txt');
const filePathHash = path.join(directory, 'hash.txt');

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

const showAndWriteTimestamp = async () => {
  var hashData;
  // Both ends can create random hash, so let us start with that
  const hashFileExists = await fileAlreadyExists(filePathHash);
  if(hashFileExists){
    hashData = await fs.promises.readFile(filePathHash);
  } else {
    hashData = uuidv4();
    writeStringToFile(filePathHash, hashData);
  }
  // This end always creates timestamp
  const currentTimestamp = (new Date()).toISOString();
  writeStringToFile(filePathTimestamp, currentTimestamp);
  console.log(currentTimestamp + " " + hashData);
  setTimeout(showAndWriteTimestamp, 5000);    
}

showAndWriteTimestamp();
