'use strict';

const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');
const adminRegister = require('./controller/adminRegister')
const add_item = require('./controller/add_item')
const edit_item = require('./controller/edit_item')

var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');


module.exports.create = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("User");
  const body = JSON.parse(event.body);

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
          message: 'successfully!',
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
  const seek = await collection.findOne({
    email: body.email,
  })

  if (seek) {
    console.log("Account found")
    if (bcrypt.compareSync(body.password, seek.password)) {
      console.log("Login Sucess")
      const token = jwt.sign(
        {
        name: seek.name,
        type: "user"
        },
        'Webapp',
        { expiresIn: '24h' });
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            body:{          
              token:token,
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


module.exports.adminCreate = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Admin");
  const body = JSON.parse(event.body);
  const seek = await collection.findOne({
    username: body.username
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
    const newuser = adminRegister.adminRegister(body);
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
}

module.exports.adminlogin = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Admin");
  const body = JSON.parse(event.body);

  const seek = await collection.findOne({
    username: body.username,
  })

  if (seek) {
    if (bcrypt.compareSync(body.password, seek.password)) {
      const token = jwt.sign(
        { 
        username: body.username,
        type: "admin"
        },
        'Webapp',
        { expiresIn: '24h' });
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            body:{
              token:token,
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
    console.log("Admin Account not existed")
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Admin Account Not Existed',
        },
        null,
        2
      ),
    };
  }
}

module.exports.getAdmin = async (event) => {
  const db = await connectToDB.connectToDB();
  const collection = await db.collection("Admin");
  const seek = await collection.findOne({
    token: ""
  })
  if (seek) {
    console.log("found");
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'successfully!',
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

module.exports.create_checkout_session = async (event) => {
  console.log(event)
  const stripe = require('stripe')('sk_test_51IeNf0KCNLyTjKjF9mpdpCIMuCelbtKuqZggAozfXOVwPeQuIGDZ7Bi1DdKumWt3JIaCC79ZiOklC0FGA5fyx90A00ec9sfS9L');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'hkd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3001/home',
    cancel_url: 'http://localhost:3001/home',
  });
  
  return ({ id: session.id });
}