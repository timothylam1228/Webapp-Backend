<<<<<<< Updated upstream
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
=======
const express = require('express')
const app = express()
const port = 3001

app.get('/api', (req, res) => {
  res.json({message: "Heello"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
>>>>>>> Stashed changes
