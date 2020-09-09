//Criar uma variável com  os links das imagens do localStorage. (Variável)
let linksList = JSON.parse(localStorage.getItem('favorites'))
const deleteAll = document.querySelector('.deleteAll')
const buttonTop = document.querySelector('.top')
const nullText = document.querySelector('p')
const lista = document.querySelector('.all-images')

//Testar se existe imagens, se não mostrar uma informação.
function init() {
  if (linksList.length != 0) {
    nullText.classList.add('shadow') 
    createList(lista) 
  }
} 

init()


//Criar os elementos (linhas) da lista. (Função)
function createList(lista) {

  linksList.forEach(link => {
    const li = document.createElement('li')

    //Inserir imagem.
    const img = document.createElement('img')
    img.setAttribute('src', link)
    li.append(img)

    //Inserir botão de remover.
    li.classList.add('delete')
    li.setAttribute('data-id', linksList.indexOf(link))
    li.onclick = removeImage   
    
    lista.append(li)
  })  
}


//Apagar uma imagem do Favoritos. (Função)
function removeImage(event) {
  const imageToRemove = event.currentTarget
  const id = imageToRemove.dataset.id
  imageToRemove.remove()
  //console.log(id)
  linksList.splice(id, 1)

  updateLocalStorage()  
}


//Apaga todas as imagens do Favoritos.
function removeAll() {
  const items = document.querySelectorAll('li')
  items.forEach(item => item.remove())

  linksList = []

  clearLocalStorage()
}


//Apagar o localStorage "Favorites". (Função)
function clearLocalStorage() {
  localStorage.removeItem('favorites')
  testNull()
}

//Atualizar o localStorge.
function updateLocalStorage() {
  //console.log(linksList)
  localStorage.setItem('favorites', JSON.stringify(linksList))
  testNull()
}

//Testa se a lista de imagens está vazia.
function testNull() {
  console.log(linksList)
  if (linksList.length != 0) {
    nullText.classList.add('shadow')
  } else {
    nullText.classList.remove('shadow')
  }
}


//Verificar se o botão remover todos foi clicado. (Evento)
deleteAll.addEventListener('click', removeAll) 


//Ação do botão top, para subir a página para o topo. (Evento)
buttonTop.onclick = () => (document.scrollingElement.scrollTop = 0)

