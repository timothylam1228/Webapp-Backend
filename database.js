const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/User?retryWrites=true&w=majority";

let cachedDB = null;

module.exports.connectToDB = async () => {
    if (cachedDB) {
        console.log("Use existing connection");
        return Promise.resolve(cachedDB);
    }
    else {
        return MongoClient.connect(MONGODB_URI, {
            native_parse: true,
            useUnifiedTopology: true,
        })
            .then((client) => {
                let db = client.db("Webapp");
                console.log("New Database Connection");
                cachedDB = db;
                return cachedDB;
            })
            .catch((error) => {
                console.log("Mongo Connection error");
                console.log(error);
            });
    }
};
