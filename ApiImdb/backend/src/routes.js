const express = require('express')
const index = require('./index.js')


const routes = express.Router()

/*routes.get('/',(req, res) => { */
  //const data = index.getData 
  
  //return res.json({message: data })
//})

//routes.get('/list/:movie', index.getData)
//routes.get('/movie', index.getMovie)

routes.get('/movie', index.getData)
routes.get('/list', index.getMovie)


module.exports = routes

