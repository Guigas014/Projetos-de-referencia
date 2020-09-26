const puppeteer = require('puppeteer')


// Nome do filme que será pesquisado
const movieName = 'jumanji'


// função que pesquisa o filme
async function searchMovie() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.imdb.com/find?q=${movieName}`)
  // await page.goto('https://www.imdb.com/title/tt2283362/?ref_=fn_al_tt_1')
 
  
  // Validar a página buscando o valor 'Title'
  const title = await page.evaluate(() => {
    
    //VALIDAÇÃO...
    title = document.querySelector('.originalTitle')
    
        
    
  })
  
  
  console.log('Fechou!')
  await browser.close()
  // return title
}


function verification(title) {
  // Testar se está na página dos filmes relacionados a pesquisa (lista)
  if (title == null) {
    createPageList()
  } 
  else {
    createPageMovie()
  }
}



searchMovie()
verification()





// Criar a página dos filmes relacionados a pesquisa
function createPageList() {
  console.log('OK')
 
}

// Criar a página do filme pesquisado
function createPageMovie() {
  console.log('NotOK')
}


