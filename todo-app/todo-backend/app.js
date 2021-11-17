const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');


const app = express();
const port = 3000;

const directory = path.join('/', 'tmp', 'pictures');
const filePathTimestamp = path.join(directory, 'fetch-timestamp.txt')
const filePathPicture = path.join(directory, 'picture.webp')

app.use('/todo/pictures', express.static(directory));

async function fileAlreadyExists(fileName) {
  try {
    await fs.promises.access(fileName, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, function(err) {
    if(err) {
        return console.log(err);
    }
})}; 

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath, function(err) {
    if(err) {
        return console.log(err);
    }
})}; 

app.get('/todo', async function(req, res) {
  var fileNeedsToBeFetched = false;
  // Fetch a file from outside server once each day, store in local file / pvc

  // Get the timestamp of last update and deduce whether a new file needs to be fetched
  const timestampExists = await fileAlreadyExists(filePathTimestamp);
  const pictureExists = await fileAlreadyExists(filePathPicture);
  var currentTimestamp = Date.now();
  if(!pictureExists){
    console.log("picture does not exist, fetch file");
    fileNeedsToBeFetched = true;
  } else if(timestampExists){
    const timestampData = await fs.promises.readFile(filePathTimestamp);
    currentTimestamp = Date.parse(timestampData);
    if(currentTimestamp < (currentTimestamp - 24*3600*1000)){
      console.log("picture exists but timestamp has gone stale, need to fetch a new picture");
      fileNeedsToBeFetched = true;
    } else {
      console.log("picture exits and timestamp is ok, no need to do anything");
    }
  } else {
    console.log("timestamp does not exist, create and fetch file");
    fileNeedsToBeFetched = true;
  }

  if(fileNeedsToBeFetched){
    // Fetch a new file
    const pictureExists = await fileAlreadyExists(filePathPicture);
    if(pictureExists){
      console.log("Picture exists, but need to fetch a new one")
      deleteFile(filePathPicture);
    }
    var response;
    try {
      console.log("Picture does not exist, need to fetch one")
      response = await axios.get("https://picsum.photos/200/200.webp", {
        responseType: 'arraybuffer'
      });
      console.log("got response from Picsum!");
      writeToFile(filePathPicture, response.data);
      currentTimestamp = Date.now();
      writeToFile(filePathTimestamp, currentTimestamp+"");
    } catch (e) {
      console.log("Error fetching and storing a new picture")
      return console.log(e);
    }
  }
  
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});

