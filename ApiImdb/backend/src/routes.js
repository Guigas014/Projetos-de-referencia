const express = require('express')
const index = require('./index.js')

const routes = express.Router()


/*routes.get('/',(req, res) => { */
  //const data = index.getData 
  
  //return res.json({message: data })
//})

routes.get('/', index.getData)
routes.get('/list', index.getMovie)

module.exports = routes

