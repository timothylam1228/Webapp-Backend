const connectToDB = require('./database')


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = require('./controller/register')


module.exports.create = async (events) => {
  const db = await connectToDB();
  const collection = await db.collection("User");
  const users = await collection.find({}).toArray();
  res.status(200).json({ users });


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

