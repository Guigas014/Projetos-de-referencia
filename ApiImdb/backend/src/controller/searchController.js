const puppeteer = require('puppeteer')


module.exports = {

  // função que pesquisa o filme
  async searchMovie(movieName) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${movieName}`)
  
    
    // Validar a página buscando o valor 'Title'
    const data = await page.evaluate(() => {
      
      if (document.querySelector('.title_wrapper').childNodes.length != 7) {
        return 'error' 
      }

      datas = document.querySelector('.title_wrapper').childNodes 
  
      const rate = document.querySelector('.ratingValue span')

      const image = document.querySelector('.poster img').src 
     

      const array = [ ...datas ]
      const movie = array.map(({ innerText }) => ( innerText ))
      
      //Tira os itens vazios do array.
      movie.map((item , index) => {
        if (item == null) {
          movie.splice(index, 1)
        }
      })

      //Cria array com outros dados
      const others = movie[2].replace(/ /g, "").split("|")
      
      // Criando array com todo o conteúdo.
      const dataMovie = {
        title: movie[0],
        originalTitle: movie[1],
        time: others[1],
        genres: others[2],
        certificate: others[0],
        rate: rate.innerText,
        image,
        uri: rate.baseURI,
      } 


      return dataMovie    //Esse retorno é obrigatório!!!!
    });
    
    
    console.log('Fechou02')
    //console.log(data)
    await browser.close()
    
    return data
  }
  
}







