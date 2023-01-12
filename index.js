var express = require('express');

var bodyParser = require('body-parser');

var route = require('./routes/');


var {connectToDb} = require('./mongoose/config');

var Port = 8012;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

connectToDb();



app.get('/',(req,res)=>res.send("Access Denied!"));

app.use('/api',route);

app.listen(Port);