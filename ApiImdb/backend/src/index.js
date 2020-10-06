const search = require('./controller/searchController.js')
const list = require('./controller/listController.js')

module.exports = {
  
  // Busca a lista de filmes relacionados com a pesquisa.
  async getData(req, res) {
    const searchName = req.query.name 

    //const hasTitle = await search.searchMovie(searchName) 
    const movies = await list.listSearch(searchName) 
      
    return res.json( movies )
  }, 


  // Busca os dados do filme selecionado na lista.
   async getMovie(req, res) {
    const link = req.query.link

    const  dataMovie  = await search.searchMovie(link) 

    return res.json(dataMovie)
  }
  

  //const movieName = searchName
  //const movieName = 'jumanji'


 //Chama o arquivo de pesquisa.
 /*const hasTitle = async () => {*/
   //const title = await search.searchMovie(movieName)
   //console.log(title)
  
 //}

  // Testa se existe mais de um titulo na pesquisa. Se title é null.
 /* async function verifyTitle(movieName) {*/
    //if (await search.searchMovie(movieName) == null) {
      //createPageList()
    //} 
    //else {
      //createPageMovie()
    //}  
  //}

  //hasTitle()
  //verifyTitle()



  // Criar a página dos filmes relacionados a pesquisa
  /*function createPageList() {*/
    //console.log('OK')
    //list.listSearch(movieName)
 
  //}

  //// Criar a página do filme pesquisado
  //function createPageMovie() {
    //console.log('NotOK')
  //}

}
