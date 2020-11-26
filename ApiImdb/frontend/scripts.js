// Obs.: Para que esse IMPORT funcione é necessário que na tag SCRIPT no HTML
// tenha o atributo type="module".

import uri from './api.js'


const searchButton = document.getElementById('search-button')
const list = document.querySelector('ul')
const load = document.querySelector('.loading')


//Função para mostrar o loading
function controlLoading(loading = true) {
  if (loading === true) {
    load.classList.remove('shadow')
  }
  else {
    load.classList.add('shadow')
  }
}


//Executa a pesquisa
searchButton.onclick = async function getContent() {

  list.innerHTML = ''

  const name = document.querySelector('input').value

  if (!name) {
    //alert("Digite o nome de um\n filme ou série.")
    //swal("Está faltando algo!", "Digite o nome de\n um filme ou série.", "warning")
    swal({
      title: "Está faltando algo!",
      text: "Digite o título de um filme ou série",
      icon: "warning",
    })

    return
  }

  controlLoading()

  const api = await fetch(`${uri}/movie/?name=${name}`)  

  const response = await api.json()
  //(`/?name=${name}`)
  
  controlLoading(false)  

  renderList(response)

  console.log(response)

}
 

//renderiza a lista
function renderList(data) {

  //Titulo
  let titleList = document.createElement('div')
  titleList.appendChild(document.createTextNode('Títulos'))
  titleList.setAttribute('class', 'title')
  
  list.appendChild(titleList)  

  //Lista
  data.map((item) => {
    let folder = document.createElement('img')
    folder.setAttribute('class', 'mini-folder')
    folder.setAttribute('src', item.image)

    let select = document.createElement('div')
    select.setAttribute('class', 'select')
    select.appendChild(document.createTextNode(item.name))

    let itemList = document.createElement('li')
    itemList.appendChild(folder)
    itemList.appendChild(select)

    list.appendChild(itemList)
  })
  
}




//Busca o filme selecionado


