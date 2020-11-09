// Obs.: Para que esse IMPORT funcione é necessário que na tag SCRIPT no HTML
// tenha o atributo type="module".

import uri from './api.js'


document.getElementById('search-button')
  .onclick = async function getContent() {

  const name = document.querySelector('input').value
   
  //const api = await fetch(`http://localhost:3001/?name=${name}`)
  const api = await fetch(`${uri}/movie/?name=${name}`) 

  const response = await api.json()
  //(`/?name=${name}`)

  console.log(response)

}
 

//Enviar para o backend

