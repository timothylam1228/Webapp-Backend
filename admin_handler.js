'use strict';

const connectToDB = require('./database')

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
                        body: {
                            token: token,
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