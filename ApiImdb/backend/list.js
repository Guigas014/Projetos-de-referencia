const puppeteer = require('puppeteer')


module.exports = {
    
     async listSearch(movieName) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://www.imdb.com/find?q=${movieName}`)
    

        // Validar a página buscando o valor 'Title'
        const movieList = await page.evaluate(() => {
        
            // const namesList = String(document.querySelector('.findSection').innerText).replace(/\t/g, "")
            // const arrayList = namesList.split('\n')
            // arrayList.shift(), arrayList.pop()
            
            // const linksList = String(document.querySelector('.findSection').innerHTML).replace(/\t/g, "")
            // const linksList = String(document.getElementsByClassName('result_text')[0].innerText)
            const linksList = document.querySelectorAll('.result_text a')

            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.innerHTML)
            // const linksList = String(document.getElementsByClassName('result_text')[0].firstElementChild.href)
            // const listlength = document.getElementsByClassName('result_text').length
            
            // const nodeList = document.querySelector('.findSection').innerHTML
            const dataArray = [ ...linksList ]
            const linkList = dataArray.map( ({ href  }) => ( href ))
            const nameList = dataArray.map( ({ innerHTML }) => ( innerHTML ))
        

            return nameList
        });
        

        console.log('Fechou01!')
        await browser.close()
    
        // return title
        
        console.log(movieList)
        }
}


