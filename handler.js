'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/User?retryWrites=true&w=majority";
const User = require('./models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports.create = async (event) => {


  MongoClient.connect(url, function (err, db) {
    db.createUser({
      
    })
    if (err) throw err;
    var dbo = db.db("Webapp");
    var new_user = module.exports = { register }
    dbo.collection("User").insertOne(new_user, function (err, res) {
      if (err) throw err;
      console.log("1 user inserted");
      db.close();
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.json({ error: err })
    }
  })

  let user = new User({
    email: req.body.email,
    password: hashedPassword
  })
  user.save()
    .then(user => {
      res.json({
        message: 'User Added!'
      })
    })
    .catch(error => {
      res.json({
        message: 'Error occured!'
      })
    })
}



