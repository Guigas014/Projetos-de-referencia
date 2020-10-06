const puppeteer = require('puppeteer')


module.exports = {

  // função que pesquisa o filme
  async searchMovie(movieName) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${movieName}`)
  
    
    // Validar a página buscando o valor 'Title'
    const data = await page.evaluate(() => {
      
      const teste = document.querySelector('.title_wrapper').textContent

      return teste    //Esse retorno é obrigatório!!!!
    });
    
    
    console.log('Fechou02')
    await browser.close()
    
    return data
  }
  
}







