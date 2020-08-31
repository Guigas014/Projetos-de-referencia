//variáveis
let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
const imageContainer = document.querySelector('.image')
const button = document.querySelector('button')

//Eventos
button.onclick = () => updateImages()
imageContainer.onclick = () => updateAll()


//Métodos
function getState() {
  const imageSource = document.querySelector('.image img').src
  const index = favorites.indexOf(imageSource)

  return { imageSource, index }
}

function updateAll() {
  updateFavorites()
  updateClasses()
}

function updateClasses() {
  const { index } = getState()

  imageContainer.classList.remove('fav')
  
  if (index != -1) {
    imageContainer.classList.add('fav')
  }
}

function updateFavorites() {
  const { index, imageSource } = getState()

  //Isto...
  index != -1
  ? favorites.splice(index, 1)
  : favorites.push(imageSource)
  
  //É isso...
  /*if (index != -1) {
    favorites.splice(index, 1)
  }
  //salva no localStorage
  else {
    favorites.push(imageSource)
  }*/

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

async function updateImages() {
  await getExternalIamge()
  updateClasses()
}

async function getExternalIamge() {
  const response = await fetch('https://source.unsplash.com/random')

  imageContainer.innerHTML = `<img src="${response.url}">`
}

getExternalIamge()

