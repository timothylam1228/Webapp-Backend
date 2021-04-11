'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const querystring = require('querystring');


module.exports.create = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const data = querystring.parse(event.body);

  const newuser = data
  const users = await collection.insertOne(newuser);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

