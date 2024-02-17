import { recipes } from '../data/recipes.js'
import { getAllGlobalLists, getAllUnfilters } from './dropdowns.js'

// const ingredients = getAllIngredients(recipes)
// // console.log(ingredients)
// const appliances = getAllAppliances(recipes)
// // console.log(appliances)
// const ustensils = getAllUstensils(recipes)
// // console.log(ustensils)
// Pour afficher les 3 listes de recipes.js (ingredients, appliances, ustensils)
const globalLists = getAllGlobalLists(recipes)
// console.log(globalLists)

// Afficher une liste parmi les 3 selon le dropdown ouvert
getAllUnfilters(globalLists)

// Creation pour afficher les recettes
document.addEventListener('DOMContentLoaded', function () {
  const recipesBox = document.getElementById('recipes__box')
  for (const recipe of recipes) {
    // Creation de l element "article" pour la card
    const article = document.createElement('article')
    article.classList.add('class', 'card')
    // Creation de l element "figure" pour l'image
    const figure = document.createElement('figure')
    figure.classList.add('class', 'card__figure')
    // Creation de l element "img"
    const img = document.createElement('img')
    // Creation d'un opérateur ternaire pour pouvoir afficher les images
    img.setAttribute('src', 'assets/recettes/Recette' + (recipe.id < 10 ? '0' + recipe.id : recipe.id) + '.webp')
    img.classList.add('class', 'card__figure__image')
    img.alt = 'Photo de ' + recipe.name
    // Creation de l element "figcaption" pour le temps
    const time = document.createElement('figcaption')
    time.classList.add('class', 'card__figure__timing')
    time.textContent = recipe.time + 'min'
    // Creation de l element "div" pourle contenu de la card
    const contentCard = document.createElement('div')
    contentCard.setAttribute('class', 'card__content')
    // Creation de l element "h2" pour le titre
    const title = document.createElement('h2')
    title.setAttribute('class', 'card__content__title')
    // Creation de l element "h3" pour le sous-titre "recette"
    const subtitleRecette = document.createElement('h3')
    subtitleRecette.setAttribute('class', 'card__content__subtitle')
    subtitleRecette.textContent = 'recette'
    // Creation de l element "p" pour la description de la recette
    const description = document.createElement('p')
    description.setAttribute('class', 'card__content__description')
    description.textContent = recipe.description
    // Creation de l element "h3" pour le sous-titre "ingrédients"
    const subtitleIngredient = document.createElement('h3')
    subtitleIngredient.setAttribute('class', 'card__content__subtitle')
    subtitleIngredient.textContent = 'ingrédients'
    // Creation de l element "ul" pour la liste d'ingrédients d'une recette
    const ingredients = document.createElement('ul')
    ingredients.setAttribute('class', 'card__content__list')
    title.textContent = recipe.name
    // Boucle pour ajouter les ingrédients
    for (const ingredient of recipe.ingredients) {
    //   console.log(ingredient)
      // Creation d'un element "li" pour chaque ingrédient
      const listItem = document.createElement('li')
      listItem.setAttribute('class', 'card__content__list__item')
      // Creation d'un element "span" pour le nom de l'ingrédient
      const spanIngredient = document.createElement('span')
      spanIngredient.classList.add('card__content__list__item--ingredients')
      spanIngredient.textContent = ingredient.ingredient
      listItem.appendChild(spanIngredient)
      // Creation d'un element "span" pour la quantité et l'unite de l'ingrédient
      const spanQuantityUnit = document.createElement('span')
      spanQuantityUnit.classList.add('card__content__list__item--quantity-unit')
      // Creation d'un opérateur ternaire pour ajouter la quantité et l'unite de l'ingrédient
      spanQuantityUnit.textContent = (ingredient.quantity === undefined ? '-' : ingredient.quantity) + (ingredient.unit === undefined ? '' : ' ' + ingredient.unit)
      listItem.appendChild(spanQuantityUnit)
      ingredients.appendChild(listItem)
    }
    // Ajout des enfants "appendChild"
    article.appendChild(figure)
    article.appendChild(contentCard)
    figure.appendChild(img)
    figure.appendChild(time)
    contentCard.appendChild(title)
    contentCard.appendChild(subtitleRecette)
    contentCard.appendChild(description)
    contentCard.appendChild(subtitleIngredient)
    contentCard.appendChild(ingredients)
    // Generation du contenu dans le DOM
    recipesBox.appendChild(article)
    // console.log(recipesBox)
  }
})

// Creation pour ouvrir et fermer les dropdowns
const dropdownsButtons = document.querySelectorAll('.dropdown__button')
// parcourir tous les dropdowns et ajouter l'event sur le dropdown cliqué
dropdownsButtons.forEach((dropdownBtn) => {
  dropdownBtn.addEventListener('click', () => {
    // Lorsque l'utilisateur clique sur le bouton, afficher le contenu du dropdown
    const currentDropdownContent = dropdownBtn.nextElementSibling
    // Si le dropdown est déjà ouvert, pouvoir le refermer
    if (currentDropdownContent.classList.contains('dropdown__content--active')) {
      currentDropdownContent.classList.remove('dropdown__content--active')
    } else {
      // Fermer tous les dropdowns
      document.querySelectorAll('.dropdown__content').forEach((dropdownContent) => {
        dropdownContent.classList.remove('dropdown__content--active')
      })
      // Ouvrir le dropdown actuel
      currentDropdownContent.classList.add('dropdown__content--active')
    }
  })
})
