var express = require('express')
var app = express()
var cors = require('cors')
var fileUpload= require('express-fileupload')
var publicDir = require('path').join(__dirname,'/uploads');
app.use(express.static(publicDir));
const bodyParser = require('body-parser');
var formidable = require('formidable');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
http = require('http'),
util = require('util');
app.use(cors())

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.post('/image',upload.single('upload'), function (req, res,next) {
    
    console.log(req.file.originalname);
    Response= {
        uploaded:1,
        fileName:req.file.originalname,
        url:'http://localhost:3000/dda157ce6d154965da19a5288f2cea43.jpg'
        }
    //console.log(req.body)

res.json(Response)
console
})

app.listen(3000)

  