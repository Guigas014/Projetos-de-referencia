const puppeteer = require('puppeteer')


module.exports = {

  // função que pesquisa o filme
  async searchMovie(movieName) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.imdb.com/find?q=${movieName}`)
    // await page.goto('https://www.imdb.com/title/tt2283362/?ref_=fn_al_tt_1')
  
    
    // Validar a página buscando o valor 'Title'
    const title = await page.evaluate(() => {
      
      title = document.querySelector('.originalTitle')
      
      return title    //Esse retorno é obrigatório!!!!
    });
    
    
    console.log('Fechou!')
    await browser.close()
    
    return title
  }
  
}






