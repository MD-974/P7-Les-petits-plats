import { generateUnfilterList } from './fonctions.js'
/**
 * Retourne un objet contenant toutes les listes globales a partir du tableau de recettes donné.
 * @param {Array} arrayRecipes - Le tableau de recettes à partir duquel on va recuperer les listes globales.
 * @return {Object} L'objet contenant toutes les listes globales.
 */
export function getAllGlobalLists (arrayRecipes) {
  const globalArray = {}
  globalArray.allRecipes = arrayRecipes
  globalArray.ingredients = getAllIngredients(arrayRecipes)
  globalArray.appliances = getAllAppliances(arrayRecipes)
  globalArray.ustensils = getAllUstensils(arrayRecipes)
  return globalArray
}

// Creation de la fonction pour afficher les listes dans les dropdowns respectifs
export function displayAllUnfilters (globalLists, type = null) {
  if (type === null) {
    // Creation de l element "li" pour afficher les ingredients dans "ul"
    const ulIngredientsUnfilter = document.getElementById('ingredients--unfilter')
    generateUnfilterList(globalLists.ingredients, ulIngredientsUnfilter)
    // Creation de l element "li" pour afficher les appareils dans "ul"
    const ulAppliancesUnfilter = document.getElementById('appliances--unfilter')
    generateUnfilterList(globalLists.appliances, ulAppliancesUnfilter)
    // Creation de l element "li" pour afficher les ustenciles dans "ul"
    const ulUstensilsUnfilter = document.getElementById('ustensils--unfilter')
    generateUnfilterList(globalLists.ustensils, ulUstensilsUnfilter)
  } else {
    const ulNewUnfilter = document.getElementById(type + '--unfilter')
    generateUnfilterList(globalLists.stockFilterList, ulNewUnfilter)
  }
}

// *-------------------------------------------------------------------------*
// *-------------- Recuperation des listes dans "recipes.js" ----------------*
// *-------------------------------------------------------------------------*

// fonction pour recuperer tous les ingredients dans "recipes.js"
function getAllIngredients (globalArray) {
  const ingredientsArray = []
  // parcourir toutes les recettes
  for (const recipe of globalArray) {
    // pour chaque recette parcourir les ingredients
    for (const ingredients of recipe.ingredients) {
      // pour chaque ingredient
      // "toLowerCase" pour eviter d avoir des doublons d ecriture  majuscule et minuscule
      if (!ingredientsArray.includes(ingredients.ingredient.toLowerCase())) {
        // ajouter l ingredient dans ingredientsArray si il n est pas dans ingredientsArray
        ingredientsArray.push(ingredients.ingredient.toLowerCase())
      }
    }
  }
  return ingredientsArray
}
// fonction pour recuperer tous les appareils dans "recipes.js"
function getAllAppliances (globalArray) {
  const appliancesArray = []
  for (const recipe of globalArray) {
    if (!appliancesArray.includes(recipe.appliance.toLowerCase())) {
      appliancesArray.push(recipe.appliance.toLowerCase())
    }
  }
  return appliancesArray
}
// fonction pour recuperer tous les ustensiles dans "recipes.js"
function getAllUstensils (globalArray) {
  const ustensilsArray = []
  for (const recipe of globalArray) {
    for (const ustensil of recipe.ustensils) {
      if (!ustensilsArray.includes(ustensil.toLowerCase())) {
        ustensilsArray.push(ustensil.toLowerCase())
      }
    }
  }
  return ustensilsArray
}

// *-------------------------------------------------------------------------*
// *------------------------ changement du chevron --------------------------*
// *-------------------------------------------------------------------------*

// chevron reste en up apres le click
// const chevronRemove = document.querySelectorAll('.dropdown__button__icon')

// chevronRemove.addEventListener('click', () => {
//   chevronRemove.classList.toggle('fa-chevron-up')
//   chevronRemove.classList.toggle('fa-chevron-down')
// })
// console.log(chevronRemove)

// chevron passe de down a up mais bug si je change de dropdown
// const dropdownIcons = document.querySelectorAll('.dropdown__button__icon')

// dropdownIcons.forEach((chevronRemove) => {
//   chevronRemove.addEventListener('click', () => {
//     chevronRemove.classList.toggle('fa-chevron-up')
//     chevronRemove.classList.toggle('fa-chevron-down')
//   })
// })

// bugg encore
// const dropdownIcons = document.querySelectorAll('.dropdown__button__icon')

// dropdownIcons.forEach((chevronRemove) => {
//   chevronRemove.addEventListener('click', () => {
//     dropdownIcons.forEach((icon) => {
//       if (icon !== chevronRemove && icon.classList.contains('fa-chevron-up')) {
//         icon.classList.toggle('fa-chevron-up')
//         icon.classList.toggle('fa-chevron-down')
//       }
//     })
//     chevronRemove.classList.toggle('fa-chevron-up')
//     chevronRemove.classList.toggle('fa-chevron-down')
//   })
// })

const dropdownChevronsButtons = document.querySelectorAll('.dropdown__button')
const dropdownIcons = document.querySelectorAll('.dropdown__button__icon')

// Pour chaque bouton dropdownChevronsButtons
dropdownChevronsButtons.forEach((button) => {
  // Ajouter un écouteur d'événements pour le clic
  button.addEventListener('click', (event) => {
    // Trouver l'icon de chevron du bouton cliqué
    const chevronIcon = event.target.closest('.dropdown__button').querySelector('.dropdown__button__icon')
    // Pour chaque icon dropdownIcons
    dropdownIcons.forEach((icon) => {
      // Si l'icon n'est pas l'icon de chevron actuelle et qu'elle a la classe 'fa-chevron-up'
      if (icon !== chevronIcon && icon.classList.contains('fa-chevron-up')) {
        // Basculer la class de l'icon entre 'fa-chevron-up' et 'fa-chevron-down'
        icon.classList.toggle('fa-chevron-up')
        icon.classList.toggle('fa-chevron-down')
      }
    })
    // Basculer la class de l'icon chevron actuelle entre 'fa-chevron-up' et 'fa-chevron-down'
    chevronIcon.classList.toggle('fa-chevron-up')
    chevronIcon.classList.toggle('fa-chevron-down')
  })
})
