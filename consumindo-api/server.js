// Esse arquivo é o backend ou a API consumida pelo frontend.

const cors = require('cors')
const express = require('express')
const axios = require('axios')
const app = express()

app.use(cors())

app.get('/', async(req, res) => {

  try {
    // o data é tirado de dentro do response
    // o http abaixo é a outra API que está sendo consumida.
    const { data } =  await axios('http://jsonplaceholder.typicode.com/users')

    return res.json(data)

  } catch (error) {
    console.log(error)  
  }
 
})

app.listen('4567')

