const express = require('express')
const cors = require('cors')

const routes = require('./routes.js')


// Iniciando o App.
const app = express()
app.use(express.json())
app.use(cors())


//Rota
app.use(routes)



app.listen('3001')

