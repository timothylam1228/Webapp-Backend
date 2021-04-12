'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');

const add_item = require('./controller/add_item')
const edit_item = require('./controller/edit_item')

var bodyParser = require('body-parser')


module.exports.create = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const body = JSON.parse(event.body);

  console.log(body.email)
  const seek = await collection.findOne({
    email: body.email
  })
  console.log(seek)
  if (seek) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Used',
        },
        null,
        2
      ),
    };
  } else {
    const newuser = register.register(body);
    console.log(newuser)
    const users = await collection.insertOne(newuser);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Registered',
        },
        null,
        2
      ),
    };
  }


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
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: ' successfully!',
        },
        null,
        2
      ),
    };
  } else {
    console.log("Not existed");
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: ' Fail!',
        },
        null,
        2
      ),
    };
  }
}

module.exports.login = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const body = JSON.parse(event.body);

  // console.log(body.email)
  // console.log(body.password)


  const seek = await collection.findOne({
    email: body.email,
  })

  if (seek) {
    console.log("Account found")
    // console.log(seek.password)
    // console.log(body.password)

    if (bcrypt.compareSync(body.password, seek.password)) {
      console.log("Login Sucess")
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            body:{
              email:seek.email,
              name: seek.name
            },
            message: 'Sucess',
          },
          null,
          2
        ),
      };
    } else {
      console.log("Login failed")
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Fail',
          },
          null,
          2
        ),
      };
    }
  } else {
    console.log("Account not existed")
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Account Not Existed',
        },
        null,
        2
      ),
    };
  }
}

module.exports.add_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Product");
  const added_item = await add_item.add(event)
  console.log(added_item)
  const users = await collection.insertOne(added_item);
  if (users) return true
}

module.exports.edit_item = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Product");
  const edited_item = await edit_item.edit(event)
  console.log(edited_item)
  const users = await collection.updateOne(edited_item);
  if (users) return true
}