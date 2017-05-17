// engine
var express = require('express');
var bodyParser = require('body-parser');
var CircularJSON = require('circular-json');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// for directories in html/css files
app.use(express.static('./'));
// for reading data from post
app.use(bodyParser.urlencoded({extended: true}));

var db;

// connecting to remote db
MongoClient.connect('mongodb://kwame:brown@ds139791.mlab.com:39791/foo-blog',function (err,database) {
	if (err)
		return console.log(err);

	db = database;

	console.log('Successfully connected to MongoDB Server.');

	// start server on port 3000
	app.listen(process.env.PORT || 3000,function () {
		console.log('App running on localhost:3000');
	});
});

// blog input route
app.get('/', function (req,res) {
	res.sendFile(__dirname+'/views/index.html');
});

// blog input route
app.get('/json', function (req,res) {
	var data = 	db.collection('blogs').find().toArray( function(err,doc) {
		res.json(CircularJSON.stringify(doc));
	});
});

// post route after form on blog input submitted
app.post('/foo', function (req,res) {
	// adding date to blog
	req.body.date = Date();

	db.collection('blogs').save(req.body,function (err,result) {
		if(err)
			console.log(err);

		console.log('Blog Saved to Database Successfully.')

		// route back home
		res.redirect('/');
	});
});

