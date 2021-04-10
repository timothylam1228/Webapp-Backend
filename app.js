// async function main() {

//   const MongoClient = require('mongodb').MongoClient;
//   const uri = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/User?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();

//     await listDatabases(client);

//   } catch (err) {
//     console.error(err);
//   } finally {
//     client.close();
//   }
// }

// main().catch(console.error);
