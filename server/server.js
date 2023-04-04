require('dotenv').config()
const {PORT} = process.env

const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(__dirname + '/../client'))

const {seed, saveTeam1, saveTeam2, useSaved1, useSaved2, getSaved, deleteTeam} = require('./controller.js')

app.post('/seed', seed)

app.post('/save-team-1', saveTeam1)
app.post('/save-team-2', saveTeam2)
app.get('/use-saved1/:teamName', useSaved1)
app.get('/use-saved2/:teamName', useSaved2)
app.get('/get-saved', getSaved)
app.delete('/delete/:teamName', deleteTeam)



app.listen(PORT, () => console.log(`App listening on ${PORT}`))