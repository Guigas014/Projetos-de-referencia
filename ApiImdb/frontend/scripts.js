 // Pega o filme pesquisado.
 document.getElementById('searchButton')
  .onclick = async function getContent() {

  const name = document.querySelector('input').value
   
  const api = await fetch(`http://localhost:3001/?name=${name}`)
  const response = await api.json()
  //(`/?name=${name}`)


  console.log(response)

  //return response
}



//Enviar para o backend

