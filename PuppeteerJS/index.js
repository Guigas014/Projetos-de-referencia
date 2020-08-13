const puppeteer = require('puppeteer');
const fs = require('fs');
const { format } = require('path');
const { S_IFMT } = require('constants');

(async () => {
  const browser = await puppeteer.launch();   //{ headless: false } - mostra o browser
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  // Toda essa função será executada no browser.
  const imgList = await page.evaluate(() => {
    // Vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img');
    // Transformar o NodeList em Array.
    const imgArray = [ ...nodeList ];
    // Transformar os nodes (elementos html) em objetos JS
    const imgList = imgArray.map( ({ src }) => ({
        src
    }));

    // Colocar para fora da função
    return imgList;
   
  });

  
  

  // Escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('Something went wrong!');

    console.log('Well done!')
  });

  

  // Salvar as imagens em uma pasta temporária
  for (let i = 0; i < 12; i++) {
    await page.goto(`${imgList[i].src}`);
    await page.screenshot({ path: `./images/img${i + 1}.png` });
  }


  // imgList.map(({ src = imgList.src}) => {
  //   // console.log(src)
  //   page.goto(`${src}`);
  //   let num = 0;
  //   page.screenshot({ path: `./images/img${num + 1}.png` });
  //   num++;
  // });


  await browser.close();
})();


// ()(); função auto executável como acima.
