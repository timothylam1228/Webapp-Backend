'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const add_item = require('./controller/add_item')
const edit_item = require('./controller/edit_item')

var bodyParser = require('body-parser')


module.exports.create = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const newuser = register.register(event);
  console.log(newuser)
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
module.exports.get = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const seek = await collection.findOne({
    email: "indian_all_sucks@gmail.com"
  })
  if (seek) {
    console.log("found");
    return true
  } else {
    console.log("Not existed");
    return false
  }
}

module.exports.login = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const body = JSON.parse(event.body);

  // console.log(body.email)
  const seek = await collection.findOne({
    email: body.email,
    password: body.password
  })
  if (seek) {
    console.log("Login successed")
    return true
  } else {
    console.log("Login failed")
    return false
  }
}

module.exports.add_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Item");
  const added_item = await add_item.add(event)
  console.log(added_item)
  const users = await collection.insertOne(added_item);
  if (users) return true
}

module.exports.edit_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Item");
  const edit_item = await edit_item.edit(event)
  console.log(edit_item)
  const users = await collection.updateOne(edit_item);
  if (users) return true
}