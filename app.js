const express = require('express')
const app = express()
const port = 3001

app.get('/api', (req, res) => {
  res.json({message: "Heello"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
