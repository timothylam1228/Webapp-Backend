const express = require('express')
const app = express()

const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:JE1BPKXM0KnAYbYy@cluster1.u7wxz.mongodb.net/User?retryWrites=true&w=majority";
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api', (req, res) => {
  res.json({message: "Heello"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/user/get', (req, res)=>{
  console.log('get');
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Webapp");
    const email = req.body.email
    const existing =  dbo.collection("User").findOne({email:email}, function (err, res){
     
        return false;
    })

  });
})

app.post('/user/create', (req,res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Webapp");
    new_user = {
      email:req.body.email,
      name: req.body.name,
      password: req.body.password
    }
    dbo.collection("User").insertOne(new_user, function (err, res) {
      if (err) throw err;
      console.log("1 user inserted");
      db.close();
    })
  });
})