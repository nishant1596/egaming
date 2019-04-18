const express = require('express');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const bodyParser=require('body-parser');
const app = express();
const mongoose = require('mongoose');
const methodOverride=require('method-override');
const upload = require('express-fileupload');
const port = process.env.PORT || 5000;
//Loading Models
require('./models/seminar');

const SeminarFetch4=mongoose.model('seminarModel');


const seminar=require('./cms-js/seminar');
const seminar_for_user=require('./seminar.js');
const mongoURI='mongodb://admin:admin123@ds027739.mlab.com:27739/egaming-development';
const devURI='mongodb://localhost/seminar'
//Mongoose connection
mongoose.connect('mongodb://admin:admin123@ds027739.mlab.com:27739/egaming-development', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
  console.log('we are connected to MongoDB');
});

//Defining Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(upload());

//Defining static folder
app.use(express.static('public'));




app.get('/', function (req, res) {
  SeminarFetch4.find({}).limit(4).sort({"_id":-1})
  .then(seminarfetched4=>{
    // console.log(seminarfetched4);
    res.render('index',{
      seminarfetched4:seminarfetched4
    });
  })
});

//Defining Routes
app.use('/cms/seminar',seminar);
app.use('/seminar',seminar_for_user);
app.listen(port,()=>{
  console.log('server is working on port 3000');
});
