import { filterList, generateUnfilterList } from './fonctions.js'
import { globalLists } from './index.js'

/**
 * Retourne un objet contenant toutes les listes globales a partir du tableau de recettes donné.
 * @param {Array} arrayRecipes - Le tableau de recettes à partir duquel on va recuperer les listes globales.
 * @return {Object} L'objet contenant toutes les listes globales.
 */
export function getAllGlobalLists (arrayRecipes) {
  const globalArray = {}
  // Contient toutes les recettes
  globalArray.allRecipes = arrayRecipes
  // Contient tous les ingrédients
  globalArray.ingredients = getAllIngredients(arrayRecipes)
  // Contient tous les appareils
  globalArray.appliances = getAllAppliances(arrayRecipes)
  // Contient tous les ustensiles
  globalArray.ustensils = getAllUstensils(arrayRecipes)
  // Liste vide pour filtrer les ingrédients
  globalArray.ingredientsFilter = []
  // Liste vide pour filtrer les appareils
  globalArray.appliancesFilter = []
  // Liste vide pour filtrer les ustensiles
  globalArray.ustensilsFilter = []
  // Retourne l'objet globalArray contenant les listes globales
  return globalArray
}

/**
 * Affiche toutes les listes déroulantes en fonction des globalLists et du type
 * @param {Object} globalLists - Objet contenant toutes les listes
 * @param {string} type - Type de liste à afficher
 */
export function displayAllDropdownsLists (globalLists, type) {
  console.log(globalLists)
  console.log(type)
  // Obtenir les éléments ul non filtrés et filtrés
  const ulUnfiltered = document.getElementById(type + '--unfilter')
  const ulFiltered = document.getElementById(type + '--filter')
  // Initialiser les variables pour contenir les listes à afficher
  let listUnfilterToDisplay = []
  let listFilterToDisplay = []
  // Déterminer les listes à afficher en fonction du type
  switch (type) {
    case 'ingredients':
      listUnfilterToDisplay = globalLists.ingredients
      listFilterToDisplay = globalLists.ingredientsFilter
      break
    case 'appliances':
      listUnfilterToDisplay = globalLists.appliances
      listFilterToDisplay = globalLists.appliancesFilter
      break
    case 'ustensils':
      listUnfilterToDisplay = globalLists.ustensils
      listFilterToDisplay = globalLists.ustensilsFilter
      break
    default:
      break
  }
  // Afficher les listes
  listUnfilterToDisplay.forEach((element) => {
    console.log(element)
    const li = document.createElement('li')
    li.textContent = element
    if (listFilterToDisplay.includes(element)) {
      // pour afficher les listes filtrées
      li.classList.add('dropdown__content__list__item--filter')
      ulFiltered.appendChild(li)
    } else {
      // pour afficher les listes non filtrées
      li.classList.add('dropdown__content__list__item--unfilter')
      ulUnfiltered.appendChild(li)
    }
  })
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

// *-------------------------------------------------------------------------*
// *------------- Creation pour ouvrir et fermer les dropdowns --------------*
// *-------------------------------------------------------------------------*
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

// *-------------------------------------------------------------------------*
// *--------- filtrer les recettes suivant la valeur dans un input ----------*
// *-------------------------------------------------------------------------*
const filterImputs = document.querySelectorAll('.dropdown__content__input')
filterImputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    console.log(event.target.value.length)
    // Obtenir le type à partir de l'ID de l'input
    const type = input.id.split('--')[1]
    // Si longueur de la valeur input est supérieure ou égale à 3
    if (event.target.value.length >= 3) {
    // Ajouter une class pour rendre visible l'élément croix de l input
      event.target.nextElementSibling.classList.add('dropdown__content__input__close--visible')
      // Mettre à jour la liste de filtres globale
      globalLists.stockFilterList = filterList(type, event.target.value, globalLists)
      // console.log(globalLists)
    }
    // Si longueur de la valeur input est inférieure à 3
    if (event.target.value.length < 3) {
      // Supprimer la classe pour rendre invisible l'élément croix de l'input
      event.target.nextElementSibling.classList.remove('dropdown__content__input__close--visible')
      // Effacer la liste des éléments non filtrés
      const targetNode = event.target.parentNode.nextElementSibling.nextElementSibling
      // console.log({ targetNode })
      targetNode.innerHTML = ''
      displayAllDropdownsLists(globalLists[type], targetNode)
    }
  })
})

// *-------------------------------------------------------------------------*
// *------ Remise a zero de l'input du dropdown au click sur la croix -------*
// *-------------------------------------------------------------------------*
const closeIconsDropdown = document.querySelectorAll('.dropdown__content__input__close')
// console.log(closeIconsDropdown)
closeIconsDropdown.forEach((icon) => {
  icon.addEventListener('click', (event) => {
    event.target.previousElementSibling.value = ''
    event.target.classList.remove('dropdown__content__input__close--visible')
    displayAllDropdownsLists(globalLists, event.target.id.split('--')[1])
  })
})
