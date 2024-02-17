/**
 * Retourne un objet contenant toutes les listes globales.
 * @param {Array} globalArray - le tableau global à partir duquel extraire les listes
 * @return {Object} un objet contenant des ingrédients, des appareils et des ustensiles
*/
export function getAllGlobalLists (globalArray) {
  return {
    ingredients: getAllIngredients(globalArray),
    appliances: getAllAppliances(globalArray),
    ustensils: getAllUstensils(globalArray)
  }
}

// Creation de la fonction pour afficher les listes dans les dropdowns
export function getAllUnfilters (globalLists) {
  // Creation de l element "li" pour afficher les ingredients dans "ul"
  const ulIngredientsUnfilter = document.getElementById('ingredients--unfilter')
  for (let i = 0; i < globalLists.ingredients.length; i++) {
    const liIngredinentsUnfilter = document.createElement('li')
    liIngredinentsUnfilter.classList.add('dropdown__content__list__item--unfilter')
    liIngredinentsUnfilter.textContent = globalLists.ingredients[i]
    ulIngredientsUnfilter.appendChild(liIngredinentsUnfilter)
  }
  // Creation de l element "li" pour afficher les appareils dans "ul"
  const ulAppliancesUnfilter = document.getElementById('appliances--unfilter')
  for (let i = 0; i < globalLists.appliances.length; i++) {
    const liAppliancesUnfilter = document.createElement('li')
    liAppliancesUnfilter.classList.add('dropdown__content__list__item--unfilter')
    liAppliancesUnfilter.textContent = globalLists.appliances[i]
    ulAppliancesUnfilter.appendChild(liAppliancesUnfilter)
  }
  // Creation de l element "li" pour afficher les ustenciles dans "ul"
  const ulUstensilsUnfilter = document.getElementById('ustensils--unfilter')
  for (let i = 0; i < globalLists.ustensils.length; i++) {
    const liUstensilsUnfilter = document.createElement('li')
    liUstensilsUnfilter.classList.add('dropdown__content__list__item--unfilter')
    liUstensilsUnfilter.textContent = globalLists.ustensils[i]
    ulUstensilsUnfilter.appendChild(liUstensilsUnfilter)
  }
}

/**
 *----------------------------------------------------------------------------*
 *----------------- Recuperation des listes dans "recipes.js" ----------------*
 *----------------------------------------------------------------------------*
 */

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
