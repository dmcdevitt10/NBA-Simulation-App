require('dotenv').config()
const {PORT} = process.env

const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(__dirname + '/../client'))

const {seed, saveTeam1, getSavedTeam} = require('./controller.js')

app.post('/seed', seed)

app.post('/save-team-1', saveTeam1)
app.get('/get-saved-team', getSavedTeam)


app.listen(PORT, () => console.log(`App listening on ${PORT}`))