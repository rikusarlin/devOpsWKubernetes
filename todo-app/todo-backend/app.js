import db from './queries.js';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

console.log("process.env.PORT: "+process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

const directory = path.join('/', 'tmp', 'pictures');
const filePathTimestamp = path.join(directory, 'fetch-timestamp.txt')
const filePathPicture = path.join(directory, 'picture.webp')

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

app.get('/background', async function(req, res) {
  console.log("In GET /background")
  var fileNeedsToBeFetched = false;
  // Fetch a file from outside server once each day, store in local file / pvc

  // Get the timestamp of last update and deduce whether a new file needs to be fetched
  const timestampExists = await fileAlreadyExists(filePathTimestamp);
  const pictureExists = await fileAlreadyExists(filePathPicture);
  var currentTimestamp = Date.now();
  if(!pictureExists){
    fileNeedsToBeFetched = true;
  } else if(timestampExists){
    const timestampData = await fs.promises.readFile(filePathTimestamp);
    currentTimestamp = Date.parse(timestampData);
    if(currentTimestamp < (currentTimestamp - 24*3600*1000)){
      fileNeedsToBeFetched = true;
    } else {
    }
  } else {
    fileNeedsToBeFetched = true;
  }

  if(fileNeedsToBeFetched){
    // Fetch a new file
    const pictureExists = await fileAlreadyExists(filePathPicture);
    if(pictureExists){
      deleteFile(filePathPicture);
    }
    var response;
    try {
      response = await axios.get("https://picsum.photos/200/200.webp", {
        responseType: 'arraybuffer'
      });
      writeToFile(filePathPicture, response.data);
      currentTimestamp = Date.now();
      writeToFile(filePathTimestamp, currentTimestamp+"");
    } catch (e) {
      return console.log(e);
    }
  }
  
  res.send(await fs.promises.readFile(filePathPicture));
});

app.get('/todos', async (req, res) => {
  console.log("in GET /todos");
  const rows = await db.getAllTodos();
  res.json(rows);
})

app.post('/todos', async (req, res) => {
  console.log("in POST /todos");
  //console.log("req.body.text: "+req.body.text);
  const newId = await db.insertTodo(req.body.text);
  const newTodo = await db.getTodo(newId);
  res.status(200).send(newTodo);
})

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});

