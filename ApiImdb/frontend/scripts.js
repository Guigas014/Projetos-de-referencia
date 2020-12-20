// Obs.: Para que esse IMPORT funcione é necessário que na tag SCRIPT no HTML
// tenha o atributo type="module".

import uri from './api.js'


const searchButton = document.getElementById('search-button')
const load = document.querySelector('.loading')
const list = document.querySelector('ul')
const movie = document.querySelector('.movie')

//Limpa toda a tela
list.setAttribute('class', 'shadow')
movie.setAttribute('class', 'shadow')
//console.log(movie.classList)


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
  movie.classList.add('shadow')

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

  //console.log(response)
 
}



//renderiza a lista
function renderList(data) {
  
  list.classList.remove('shadow')

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
    select.addEventListener("click", getMovie)
    select.appendChild(document.createTextNode(item.name))

    let url = document.createElement('span')
    url.hidden = true
    url.innerText = item.link
    select.appendChild(url)

    let itemList = document.createElement('li')
    itemList.appendChild(folder)
    itemList.appendChild(select)

    list.appendChild(itemList)
  })
  
}



//Busca o filme selecionado
async function getMovie(obj) {

  const link = obj.target.childNodes[1].innerText

  list.setAttribute('class', 'shadow')

  controlLoading()

  const api = await fetch(`${uri}/list/?link=${link}`)  

  const response = await api.json()
 
  controlLoading(false)  
  
  if (response == 'error') {
    swal({ title: "Esse item não é um filme!", icon: "error" })
  }
  else {
    renderMovie(response)
  }

  console.log(response)
 

  //console.log(obj.target.childNodes[1].innerText)
}



//renderiza o Filme
function renderMovie(data) {

  movie.innerHTML = ''
  movie.classList.replace('shadow', 'movie')

  //Header
  const header = document.createElement('div')
  header.setAttribute('class', 'header-movie')

  const headerTitle = document.createElement('h2')
  headerTitle.appendChild(document.createTextNode(data.title))
  headerTitle.setAttribute('class', 'name-movie')
  
  const fav = document.createElement('div')
  fav.setAttribute('class', 'watching')

  header.appendChild(headerTitle)
  header.appendChild(fav)


  

  movie.appendChild(header)
}


