'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');

module.exports.get_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Product");
  const seek = await collection.find({}).toArray()
  console.log(seek)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        body: seek
      },
      null,
      2
    ),
  };


}