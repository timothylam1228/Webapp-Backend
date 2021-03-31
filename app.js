const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});