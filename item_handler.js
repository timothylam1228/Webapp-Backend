const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');

module.exports.getitem = async (event) => {
    const db = await connectToDB.connectToDB();
    const collection = await db.collection("Product");
    const seek = await collection.find({})
      console.log("found",seek);
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
  
  }