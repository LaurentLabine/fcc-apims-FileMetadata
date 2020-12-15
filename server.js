const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer")
require('dotenv').config()

var app = express();


  const upload = multer({dest:"uploads/"})


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
//Documentation here : https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f
app.post("/api/fileanalyse", upload.single('upfile'), async (req, res) => {
  try {
    return res.json({name:req.file.originalname, type:req.file.mimetype, size: req.file.size})
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
