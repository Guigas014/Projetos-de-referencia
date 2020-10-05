const search = require('./controller/searchController.js')
const list = require('./controller/listController.js')

module.exports = {
  // Nome do filme que será pesquisado
  getData(req, res) {
   const searchName = req.query.name 

   return res.json({ movie: searchName })
  } 
}
 


//const movieName = searchName
//const movieName = 'jumanji'


 //Chama o arquivo de pesquisa.
/* const hasTitle = async () => {*/
   //const title = await search.searchMovie(movieName)
   //console.log(title)
  
 //}
 //hasTitle()



// Testa se existe mais de um titulo na pesquisa. Se title é null.
async function verifyTitle(movieName) {
  if (await search.searchMovie(movieName) == null) {
    createPageList()
  } 
  else {
    createPageMovie()
  }  
}

//verifyTitle()



// Criar a página dos filmes relacionados a pesquisa
function createPageList() {
  console.log('OK')
  list.listSearch(movieName)
 
}

// Criar a página do filme pesquisado
function createPageMovie() {
  console.log('NotOK')
}


