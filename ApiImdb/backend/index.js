const puppeteer = require('puppeteer')


// Nome do filme que será pesquisado
const movieName = jumanji

// função que pesquisa o filme
async function searchMovie() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.imdb.com/find?q=${movieName}`)

  
  // Validar a página buscando o valor 'Title'
  const title = await page.evaluate(() => {
    
    //VALIDAÇÂO...

    // return title
  })

  // Testar se está na página dos filmes relacionados a pesquisa
  if (title) {
    createPageList()
  } 
  else {
    createPageMovie()
  }

  await browser.close()
}



// Criar a página dos filmes relacionados a pesquisa
function createPageList() {}

// Criar a página do filme pesquisado
function createPageMovie() {}



searchMovie()
