import { recipes } from '../data/recipes.js'
import { getAllGlobalLists, displayAllDropdownsLists } from './dropdowns.js'
import { updateRecipesCount } from './fonctions.js'

// Pour afficher les 3 listes de recipes.js (ingredients, appliances, ustensils)
export const globalLists = getAllGlobalLists(recipes)

export function setRecipesToDisplay () {
  // reinitialisation de la liste des recettes a afficher
  globalLists.recipesToDisplay = recipes

  // Recalcul de la liste des recettes a afficher en fonction des recherches dans la searchbar
  generateRecipesListSearchBar()
  // Recalcul de la liste des recettes a afficher en fonction des filtres selectionnes
  generateRecipesListFilters()
  // Rafraîchit l'affichage avec toutes les recettes
  displayRecipesList(globalLists)

  // Rafraichir l'affichage des dropdowns
  displayAllDropdownsLists(globalLists, 'ingredients')
  displayAllDropdownsLists(globalLists, 'appliances')
  displayAllDropdownsLists(globalLists, 'ustensils')
}

// *----------------------------------------------------------*
// *------- fonction pour generer la liste des recettes ------*
// *------ en fonction de la recherche dans la searchbar -----*
// *----------------------------------------------------------*

function generateRecipesListSearchBar () {
  if (globalLists.mainSearch.length > 0) {
    const resultsArray = globalLists.recipesToDisplay.filter(recipe => {
      return globalLists.mainSearch.every(searchWord => {
        const lowercaseSearchWord = searchWord.toLowerCase()

        if (recipe.name.toLowerCase().includes(lowercaseSearchWord)) {
          return true
        }

        if (recipe.description.toLowerCase().includes(lowercaseSearchWord)) {
          return true
        }

        return recipe.ingredients.some(ingredient => {
          const lowercaseIngredient = ingredient.ingredient.toLowerCase()
          return lowercaseIngredient.includes(lowercaseSearchWord)
        })
      })
    })

    globalLists.recipesToDisplay = resultsArray
  }
}

// *----------------------------------------------------------*
// *------- fonction pour generer la liste des recettes ------*
// *---------- en fonction des filtres selectionnes ----------*
// *----------------------------------------------------------*
function generateRecipesListFilters () {
  globalLists.recipesToDisplay = globalLists.recipesToDisplay.filter(recipe => {
    const result = [false, false, false]

    // Si le tableau des filtres contient un ou plusieurs ingrédients
    if (globalLists.ingredientsSelected.length > 0) {
      // Si la recette contient cet ingrédient
      if (globalLists.ingredientsSelected.every(ingredient => recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient))) {
        // La recette valide le filtre ingrédient
        result[0] = true
      }
    } else {
      result[0] = true
    }

    // Si le tableau  des filtres contient un ou plusieurs appareils
    if (globalLists.appliancesSelected.length > 0) {
      // Si la recette contient cet appareils
      if (globalLists.appliancesSelected.includes(recipe.appliance.toLowerCase())) {
        // La recette valide le filtre appareils
        result[1] = true
      }
    } else {
      result[1] = true
    }

    // Si le tableau  des filtres contient un ou plusieurs ustensils
    if (globalLists.ustensilsSelected.length > 0) {
      // Nettoyer le tableu recipe.ustensils pour vraiment mettre en minuscule
      const cleanUstensils = []
      recipe.ustensils.forEach(ustensil => cleanUstensils.push(ustensil.toLowerCase()))
      recipe.ustensils = cleanUstensils
      // Si la recette contient cet ustensils
      if (globalLists.ustensilsSelected.every(ustensil => recipe.ustensils.includes(ustensil.toLowerCase()))) {
        // La recette valide le filtre ustensils
        result[2] = true
      }
    } else {
      result[2] = true
    }

    return result.every(v => v === true)
  })
}

// *----------------------------------------------------------*
// *------- fonction pour creer la liste des recettes --------*
// *----------------------------------------------------------*
export function displayRecipesList (globalLists) {
  const recipesBox = document.getElementById('recipes__box')
  recipesBox.innerHTML = ''

  // Message d'alerte si aucun resultat n'a été trouvé
  if (globalLists.recipesToDisplay.length === 0) {
    const searchValue = document.getElementById('input_search').value
    const errorMessageDiv = document.createElement('div')
    errorMessageDiv.classList.add('recipes__box__error')
    errorMessageDiv.innerHTML = errorMessageDiv.textContent = `Aucune recette ne contient " <strong style="color: red">${searchValue}</strong> ". Vous pouvez chercher « tarte aux pommes », « poisson, », etc.`
    recipesBox.appendChild(errorMessageDiv)
    const recipesNumber = document.getElementById('recipes__numbers')
    recipesNumber.textContent = '0'
    return false
  }

  // setRecipesToDisplay(globalLists)
  for (const recipe of globalLists.recipesToDisplay) {
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
    // Creation de l element "div" pour le contenu de la card
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
  }

  // Mise a jour du compteur de recette
  updateRecipesCount(globalLists)
}

const mainSearchBar = document.getElementById('input_search')
mainSearchBar.addEventListener('input', (event) => {
  if (event.target.value.length >= 3) {
    // Ajouter une class pour rendre visible l'élément croix de l input
    event.target.nextElementSibling.classList.add('header__container__search__box__button__close--visible')
    const closeBtn = document.getElementById('header-search-close-button')
    closeBtn.addEventListener('click', (event) => {
      // effacer la value de l'input
      mainSearchBar.value = ''
      // Enlever le message d'erreur
      securityErrorDiv.style.display = 'none'
      // Enlever la class pour rendre invisible l'élément croix de l input
      event.target.classList.remove('header__container__search__box__button__close--visible')
      mainSearchBar.nextElementSibling.classList.remove('header__container__search__box__button__close--visible')
      // console.log('click : croix enlever')

      // ------------------------------------------------
      // reafficher la liste de toutes les recettes
      globalLists.mainSearch = []
      // Mettre à jour la liste des recettes a afficher en fonction
      // des recherches dans la searchbar
      setRecipesToDisplay()
    })

    const userSearch = event.target.value

    // controle de sécurité pour l'input de recherche
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/gm
    const securityErrorDiv = document.getElementById('header__container__search__box__error')

    if (!userSearch.match(regex) || userSearch.length < 3) {
      console.log('Caractère non autorisé')
      // Afficher le message d'erreur
      const securityErrorParagraph = document.getElementById('header__container__search__box__error__text')
      securityErrorParagraph.innerText = 'Caractère non autorisé, veuillez utiliser 3 caractères alphabétiques au minimum.'
      securityErrorDiv.style.display = 'block'
      return false
    } else {
      // Enlever le message d'erreur
      console.log('Caractère autorisé')
      securityErrorDiv.style.display = 'none'
    }

    const userSearchTrimmed = userSearch.trim()
    const userSearchSplit = userSearchTrimmed.split(' ')

    globalLists.mainSearch = userSearchSplit
    console.log(globalLists)
  } else {
    // reafficher la liste de toutes les recettes
    // si la longueur de la recherche est inférieure à 3
    globalLists.mainSearch = []
  }

  // Mettre à jour la liste des recettes a afficher en fonction
  // des recherches dans la searchbar
  setRecipesToDisplay()
  console.log('recettes a afficher ', globalLists.recipesToDisplay)
})

// *--------------------------------------------------------------------------------------------*
// *----------------------------- affiche la liste de tout recettes ----------------------------*
// *---------------------------------- au chargement de la page --------------------------------*
// *--------------------------------------------------------------------------------------------*
setRecipesToDisplay()
// console.log(setRecipesToDisplay)
