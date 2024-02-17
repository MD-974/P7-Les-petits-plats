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

/**
 * Récupère tous les éléments non filtrés et crée un élément de liste pour chacun.
 * @param {Array} globalArray - le tableau contenant tous les éléments non filtrés
 * @return {}
 */
// export function getAllUnfilters (globalArray) {
//   // console.log(globalArray)
//   const ulIngredients = document.getElementById('ingredients--unfilter')
//   const listIngredients = document.createElement('li')
//   listIngredients.classList.add('dropdown__content__list--unfilter__item')
//   ulIngredients.appendchild(listIngredients)
// }
