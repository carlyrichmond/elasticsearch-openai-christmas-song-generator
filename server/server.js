const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());

const port = 3000

app.get('/', (req, res) => {
  res.send('I am the H.A.L 9000. You may call me Hal.')
})

app.get('/chat', (req, res) => {
    const question = req.params.question;
    res.send(`You asked me ${question}. I can't let you do that Dave.`)
  })

app.listen(port, () => {
  console.log(`Hal is listening on port ${port}`)
})