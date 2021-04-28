'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectID;
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
  collection.insert({
    title: body.title,
    price: Number(body.price),
    desc: body.desc,
    img: body.img
  })
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "added"
      },
      null,
      2
    ),
  };
}

module.exports.remove_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Product");
  const body = JSON.parse(event.body);
  const id = body._id
  console.log('id',id)

  collection.deleteOne({ _id :ObjectId(id._id)})
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "removed"
      },
      null,
      2
    ),
  };
}