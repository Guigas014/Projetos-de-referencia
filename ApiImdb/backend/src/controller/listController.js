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
            const dataLink = document.querySelectorAll('.result_text a')
            const dataImage = document.querySelectorAll('.primary_photo img')

            const dataName = document.querySelectorAll('.findSection')[0].childNodes[3].childNodes[1].childNodes
          
            //Lista os nomes
            const arrayName = [ ...dataName ]
            const nameList = arrayName.map(({ innerText }) => ( 
              innerText.replace(/\t/g, "")
            ))
            const length =arrayName.length 
          
            //Lista os links
            const arrayLink = [ ...dataLink ]
            let linkList = [] 

            for (let i = 0; i < length; i++) {
              linkList.push(arrayLink[i].href)
            }

            //Lista as imagens
            const arrayImage = [ ...dataImage ]
            let imageList = []

            for (let i = 0; i < length; i++) {
              imageList.push(arrayImage[i].src)
            }

          
            //Junta os dados em um objeto
            let list = []

            for (let i = 0; i < length; i++) {
              list.push({
                name: nameList[i],
                link: linkList[i],
                image: imageList[i]
              })
            }

          //const list = [length, nameList, linkList, imageList]
            
            return list
        });
        

        console.log('Fechou01!')
        await browser.close()
        
        //console.log(movieList)
        
         return movieList 
        }
}


