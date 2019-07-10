// const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var collection =null;
var db =null;
// var url ='mongodb://localhost:27017';

const mongoose = require('mongoose');



var url ='mongodb://127.0.0.1:27017';

mongoClient.connect(url, (err,client)=>{

  if(err){
    console.log("db connection error")
    console.log(err)
    return
  }
  console.log('connected to DB');
  db = client.db('demodata');
  collection = db.collection('person');
});


// this is our create methid
// this method adds new data in our database
router.post('/postData', (req, res) => {
  console.log("********inside postData");

  console.log( "jamie" , req.body);

  // const { id, message } = req.body;

  collection.insertOne(req.body).then(()=>{return res.json({ success: true })});



});
// this is our MongoDB database
// const dbRoute =
//   'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';

// connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });

// let db = mongoose.connection;

// db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  var a = collection.find().toArray(function(err, docs) {
        return res.json(docs);
      });



  // .then(err, data){
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true, data: data });
  // });
  console.log('inside getData backend', a);
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData/:id', (req, res) => {

  var id = req.params.id;
  console.log("id "+ id);
  // console.log('delete backend api '+);
  var _id=  mongoose.Types.ObjectId(id);
  collection.deleteOne( { "_id" : _id } ).then((result)=>{

    console.log("result   "+JSON.stringify(result));
  });


  return res.json({ success: true });
});



// append /api for our http requests
app.use('/app/people', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));