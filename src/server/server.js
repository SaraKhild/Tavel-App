var path = require('path')
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('dist'))
console.log(__dirname)


const projectData = {};

// designates what port the app will listen to for incoming requests
app.listen(3031, function () {
    console.log('Example app listening on port 3031!')
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// Post Route
app.post('/addData',addDataInfo);

function addDataInfo(req, res) {
  projectData['fromCity'] = req.body.fromCity;
  projectData['toCity'] = req.body.toCity;
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['weatherCondition'] = req.body.weatherCondition;
  projectData['image'] = req.body.image;
  //projectData['days'] = req.body.days;

  res.send(projectData);
}

module.exports = app;
