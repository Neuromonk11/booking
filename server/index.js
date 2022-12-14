const express = require('express'),
  cors = require('cors'),
  app = express()
  fs = require('fs'),
  fileName = './file.json'
// const file = require(fileName);
app.use(express.json())
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');



})


app.get('/get_list', function (req, res) {
  fs.readFile(fileName, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const json = JSON.parse(jsonString)

    // console.log("json:", json);

    res.send(json);

  });
})

app.post('/book_seat', function (req, res) {
  console.log('1')

  fs.readFile(fileName, "utf8", (err, jsonString) => {
    
    if (err) {
      console.log("File read failed:", err);
      return;
    }else{
      const json = JSON.parse(jsonString)

      console.log("json:", json.seats);
      console.log("json updated: ", json);
      if(json.seats[req.body.seat].available){
        if(json.seats[req.body.seat].reserdedDates.includes(req.body.datetime)){
          res.send(false);
          return;
        }else {
          console.log('2')
          json.seats[req.body.seat].userInfo.push({user: req.body.userInfo, date: req.body.datetime})
          json.seats[req.body.seat].reserdedDates.push(req.body.datetime);
          if(json.seats[req.body.seat].reserdedDates.length > 2) json.seats[req.body.seat].available = false;
        }
        fs.writeFile(fileName, JSON.stringify(json, null, 2), function writeJSON(err) {
          if (err) return console.log(err);
          console.log('writing to ' + fileName);
        });
        res.send(json);
      }else{
        res.send(false);
      }

    }

  });  
})

app.listen(8080, () =>
  console.log('Example app listening on port 8080!'),
);