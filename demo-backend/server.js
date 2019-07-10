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
    console.log("db connection error");
    console.log(err);
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
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  // const { id, update } = req.body;
  //   // Data.findByIdAndUpdate(id, update, (err) => {
  //   //   if (err) return res.json({ success: false, error: err });
  //   //   return res.json({ success: true });
  //   // });
  var id = req.body._id;
  console.log("id "+ id);
  // console.log('delete backend api '+);
  var _id=  mongoose.Types.ObjectId(id);

  collection.updateOne({ "_id" : _id },  {$set:{isChecked: req.body.isChecked}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
  return res.json({ success: true });
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