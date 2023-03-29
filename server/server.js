require('dotenv').config()
const {PORT} = process.env

const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(__dirname + '/../client'))

const {seed} = require('./controller.js')

app.post('/seed', seed)


app.listen(PORT, () => console.log(`App listening on ${PORT}`))