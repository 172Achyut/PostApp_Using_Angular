const express = require('express');

var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/join";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("postDB");
  dbo.collection('posts').aggregate([
    { $lookup:
       {
         from: 'users',
         localField: 'user_id',
         foreignField: '_id',
         as: 'userdetail'
       }
    }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

