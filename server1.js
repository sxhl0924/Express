var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer  = require('multer');

var createFolder = function(folder){
  try{
     fs.accessSync(folder);
  }catch(e){
     fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);


//var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, uploadFolder);
    },
    filename: function(req, file, cb){
       cb(null, file.originalname);
    }
});

var upload = multer({storage : storage});


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var app = express();

app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.get('/', function(req, res){
  console.dir(req.query);
  res.send("home page: " + req.query.find);
});

app.get('/form/:name', function(req, res){
  //var person = req.params.name;
  var data = { age: 29, job: 'CEO', hobbies: ['eating', 'coding', 'finshing']}
  res.render('form', { data: data });
});

app.get('/about', function(req, res){
  res.render('about');
});

app.post('/', urlencodedParser, function(req, res){
  console.dir(req.body);
  res.send(req.body.name);
});

app.post('/upload', upload.single('logo'), function(req, res){
  console.dir(req.file);
  res.send({'ret_code': 0});

});

app.get('/profile/:id/user/:name', function(req, res){
  console.dir(req.params);
  res.send("You requested to see a profile page with the name of " + req.params.name);
});

app.get('/ab?cd', function(req, res){
  res.send('/ab?cd');
});

app.listen(3000);
console.log('listening to port 3000');
