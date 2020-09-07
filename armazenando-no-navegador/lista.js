//Criar uma variável com  os links das imagens do localStorage. (Variável)
const linksList = JSON.parse(localStorage.getItem('favorites')) || []
//console.log(linksList)
//
//Testar se existe imagens, se não mostrar uma informação.
function init() {
  if (linksList) {
    document.querySelector('p').classList.add('shadow') 
    createList() 
  } 
}
  
init()


//Criar os elementos (linhas) da lista. (Função)
function createList() {

  //Busca o elemento pai da lista do HTML. (variável)
  const lista = document.querySelector('.all-images')

  linksList.forEach(link => {
    const li = document.createElement('li')

    //Inserir imagem.
    const img = document.createElement('img')
    img.setAttribute('src', link)
    li.append(img)

    //Inserir botão de remover.
    li.classList.add('delete')
    li.setAttribute('data-id', linksList.indexOf(link))
    //li.onclick = removeImage     
    
    lista.append(li)
  })  
}

//Apagar uma imagem do Favoritos. (Função)
//function removeImage() {}
  //Remover imagem da lista.
  //Apagar o link da imagem do localStorage.

//Verificar se o botão remover todos foi clicado. (Evento)
  //Apagar o localStorage "Favorites". (Função)

//Atualizar a variável dos linksList. (Função) ??????


//Ação do botão top, para subir a página para o topo. (Evento)
const buttonTop = document.querySelector('.top')
buttonTop.onclick = () => (document.scrollingElement.scrollTop = 0)

