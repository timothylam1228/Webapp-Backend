'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/User?retryWrites=true&w=majority";

module.exports.create = async (event) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Webapp");
    var new_user = { name: "Siu Mui" }
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



