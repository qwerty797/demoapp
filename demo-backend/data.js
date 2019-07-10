const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
  	name: String,
    age: Number,
    balance: Number,
    email: String,
    address: String

  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
var x = mongoose.model("demodatabse", DataSchema);

module.exports = x;