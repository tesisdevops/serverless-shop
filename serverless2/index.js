'use strict';
const mongoose = require('mongoose');
const uri = (process.env.MONGODB_URI ||'mongodb+srv://tesis12:tesis12@cluster0.nojmz.mongodb.net/tesis?retryWrites=true&w=majority');

let conn = null;// connection

module.exports.handler = 
async function (event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });
    
    await conn;
    conn.model('Product', new mongoose.Schema(
      {
          name:String,
          caption:String,
          description: String,
          skus: String,
          images: Array,
      }));
  }
  
  //Model
  const M = conn.model('Product');

  const doc = await M.find({});
  console.log(doc);

  return doc;
};