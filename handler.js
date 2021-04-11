const connectToDB = require('./database')


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = require('./controller/register')


module.exports.create = async (events) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const newuser = { register }
  const users = await collection.insertOne(newuser);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        user: users,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

