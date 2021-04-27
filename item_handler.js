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

module.exports.edit_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Product");
  const body = JSON.parse(event.body);
  const edited_item = await edit_item.edit(event)
  console.log(edited_item)
  const users = await collection.updateOne(edited_item);
  if (users) return {
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