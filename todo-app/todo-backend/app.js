const express = require('express');
const bodyParser= require('body-parser')
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
const port = 3001;

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


var todos = [{"id":1, "text":"Get a life"},{"id":2, "text":"Exercise more"}];
var n_todos = 2;

app.get('/todos', (req, res) => {
  console.log("in GET /todos");
  res.json(todos);
})

app.post('/todos', (req, res) => {
  console.log("in POST /todos");
  console.log("req.body: "+req.body);
  console.log("req.body.text: "+req.body.text);
  n_todos++;
  const newTodo = {"id": n_todos, "text": req.body.text};
  todos.push(newTodo);
  res.json(newTodo);
})

app.listen(port, function() {
  console.log(`Server started in port ${port}!`)
});

