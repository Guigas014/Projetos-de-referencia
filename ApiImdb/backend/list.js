const puppeteer = require('puppeteer')


module.exports = {
    
     async listSearch(movieName) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://www.imdb.com/find?q=${movieName}`)
    

        // Validar a página buscando o valor 'Title'
        const movieList = await page.evaluate(() => {
        
            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.innerHTML)
            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.href)
            // const linksList = document.querySelectorAll('.result_text a')
            const linksList = document.querySelectorAll('.result_text')
            const dataArray = [ ...linksList ]

            const linkList = dataArray.map( ({ innerText }) => ( innerText ))
            // const linkList = dataArray.map( ({ href }) => ( href ))
            // const nameList = dataArray.map( ({ innerHTML }) => ( innerHTML ))
            
            return linkList
        });
        

        console.log('Fechou01!')
        await browser.close()
    
        // return title
        
        console.log(movieList)
        }
}


