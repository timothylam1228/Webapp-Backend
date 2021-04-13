const connectToDB = require('./database')
const register = require('./controller/register')
const bcrypt = require('bcryptjs');

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