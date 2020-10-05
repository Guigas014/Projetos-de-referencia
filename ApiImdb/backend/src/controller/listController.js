const puppeteer = require('puppeteer')


module.exports = {
    
     async listSearch(movieName) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://www.imdb.com/find?q=${movieName}`)
    

        // Validar a página buscando o valor 'Title'
        const movieList = await page.evaluate(() => {
        
            //Exemplos
            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.innerHTML)
            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.href)
            
            // Busca os nomes dos filmes
            // const names = document.querySelectorAll('.result_text')
            // const nameArray = [ ...names ]
            // const nameList = nameArray.map( ({ innerText }) => ( innerText ))
            
            //Busca os links e nomes dos filmes listados
            const data = document.querySelectorAll('.result_text a')
            const dataArray = [ ...data ]
            const linkList = dataArray.map( ({ href }) => ( href ))
            const nameList = dataArray.map( ({ innerText }) => ( innerText ))
            
            
            // const length = nameArray.length
            
            
            return nameList
        });
        

        console.log('Fechou01!')
        await browser.close()
        
        console.log(movieList)
        
        // return title
        }
}


