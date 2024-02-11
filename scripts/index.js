// Récupération des données JSON depuis un fichier
fetch('data/recipes.json')
  .then(response => response.json())
  .then(data => {
    data.recipes.forEach(recipe => {
      createRecipeCard(recipe.image, recipe.name, recipe.cookingTime, recipe.description)
    })
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON:', error))

// Création de la carte d'article
function createRecipeCard (imageUrl, recipeName, cookingTime, description) {
  const card = document.createElement('div')
  card.classList.add('recipe-card')

  const image = document.createElement('img')
  image.src = imageUrl
  image.alt = recipeName
  card.appendChild(image)

  const tag = document.createElement('div')
  tag.classList.add('tag')
  tag.textContent = `Temps de cuisson : ${cookingTime}`
  card.appendChild(tag)

  const desc = document.createElement('div')
  desc.classList.add('description')
  desc.innerHTML = `
    <h2>${recipeName}</h2>
    <p>${description}</p>
  `
  card.appendChild(desc)

  document.body.appendChild(card) // Ajoute la carte à la page
}
