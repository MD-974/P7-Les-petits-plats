import { filterList, displayFilterTags } from './fonctions.js'
import { globalLists, displayRecipesList } from './index.js'

// Tableau des types
const typesArray = ['ingredients', 'appliances', 'ustensils']

/***************************************************************************************************************
 * Retourne un objet contenant toutes les listes globales a partir du tableau de recettes donné.              **
 * @param {Array} arrayRecipes - Le tableau de recettes à partir duquel on va recuperer les listes globales.  **
 * @return {Object} L'objet contenant toutes les listes globales.                                             **
 **************************************************************************************************************/
export function getAllGlobalLists (arrayRecipes) {
  const globalArray = {}
  // Contient toutes les recettes
  globalArray.allRecipes = arrayRecipes
  // Contient les recettes à afficher
  globalArray.recipesToDisplay = [...arrayRecipes]
  // Contient tous les ingrédients
  globalArray.ingredients = getAllIngredients(globalArray.recipesToDisplay)
  // Contient tous les appareils
  globalArray.appliances = getAllAppliances(globalArray.recipesToDisplay)
  // Contient tous les ustensiles
  globalArray.ustensils = getAllUstensils(globalArray.recipesToDisplay)
  // Liste vide pour filtrer les ingrédients
  globalArray.ingredientsFilter = []
  // Liste vide pour filtrer les appareils
  globalArray.appliancesFilter = []
  // Liste vide pour filtrer les ustensiles
  globalArray.ustensilsFilter = []
  // contient la liste des recherches selectionnees
  globalArray.searchBarSelected = []
  // contient la liste des ingredients selectionnes
  globalArray.ingredientsSelected = []
  // contient la liste des appareils selectionnes
  globalArray.appliancesSelected = []
  // contient la liste des ustensiles selectionnes
  globalArray.ustensilsSelected = []
  // Retourne l'objet globalArray contenant les listes globales
  return globalArray
}

/***********************************************************************************************************************
* Affiche toutes les listes déroulantes en fonction des listes globales et du type spécifié.                          **
* @param {Object} globalLists - les listes globales contenant les ingrédients, les appareils et les ustensiles        **
* @param {string} type - le type de liste à afficher (ingrédients, appareils, ustensiles)                             **
* @param {boolean} [isFilter=false] - indicateur pour savoir si les listes sont filtrées                              **
***********************************************************************************************************************/
export function displayAllDropdownsLists (globalLists, type, isFilterInput = false) {
  // console.log(globalLists)
  // console.log(type)
  // Obtenir les éléments ul non filtrés et filtrés
  const ulUnfiltered = document.getElementById(type + '--unfilter')
  const ulFiltered = document.getElementById(type + '--filter')
  // Initialiser les variables pour contenir les listes à afficher
  let listUnfilterToDisplay = []
  ulUnfiltered.innerHTML = ' '
  let listFilterToDisplay = []
  ulFiltered.innerHTML = ' '

  // On regénère le contenu de chaque liste depuis les recettes à afficher
  globalLists.ingredients = getAllIngredients(globalLists.recipesToDisplay)
  globalLists.appliances = getAllAppliances(globalLists.recipesToDisplay)
  globalLists.ustensils = getAllUstensils(globalLists.recipesToDisplay)

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
      listFilterToDisplay = []
      break
  }
  const listToDisplay = isFilterInput ? listFilterToDisplay : listUnfilterToDisplay
  listToDisplay.forEach((element) => {
    const li = document.createElement('li')
    li.dataset.type = type
    li.textContent = element
    if (globalLists[type + 'Selected'].includes(element)) {
      console.log('ok')
      li.classList.add('dropdown__content__list__item--filter')
      const tagsClose = document.createElement('span')
      tagsClose.classList.add('fa-solid', 'fa-xmark')
      tagsClose.classList.add('tags__close')
      ulFiltered.appendChild(li)
      li.appendChild(tagsClose)
      // Ajout d'un ecouteur d'evenement pour supprimer au click le 'li' cliquer
      tagsClose.addEventListener('click', (event) => {
        console.log(event.currentTarget.parentElement.textContent + ' ' + type)
        globalLists[type + 'Selected'].splice(globalLists[type + 'Selected'].indexOf(event.target.parentElement.textContent), 1)
        console.log(globalLists)
        displayRecipesList(globalLists)
        typesArray.forEach(tmpType => displayAllDropdownsLists(globalLists, tmpType))
        displayFilterTags(globalLists, type)
      })
    } else {
      li.classList.add('dropdown__content__list__item--unfilter')
      ulUnfiltered.appendChild(li)
      // Ajout d'un ecouteur d'evenement pour afficher au clic le 'li' cliquer
      li.addEventListener('click', (event) => {
        console.log(event.currentTarget.textContent + ' ' + type)
        globalLists[type + 'Selected'].push(event.target.textContent)
        console.log(globalLists)
        displayRecipesList(globalLists)
        typesArray.forEach(tmpType => displayAllDropdownsLists(globalLists, tmpType))
        displayFilterTags(globalLists, type)
      })
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
    // On vide le tout
    document.getElementById(type + '--unfilter').innerHTML = ''
    document.getElementById(type + '--filter').innerHTML = ''
    // Si longueur de la valeur input est supérieure ou égale à 3
    if (event.target.value.length >= 3) {
    // Ajouter une class pour rendre visible l'élément croix de l input
      event.target.nextElementSibling.classList.add('dropdown__content__input__close--visible')
      // Mettre à jour la liste de filtres globale
      globalLists[`${type}Filter`] = filterList(type, event.target.value, globalLists)
      // Afficher la liste filtrée
      displayAllDropdownsLists(globalLists, type, true)
    }
    // Si longueur de la valeur input est inférieure à 3
    if (event.target.value.length < 3) {
      // Supprimer la classe pour rendre invisible l'élément croix de l'input
      event.target.nextElementSibling.classList.remove('dropdown__content__input__close--visible')
      // On vide la liste des éléments filtrés
      globalLists[`${type}Filter`] = []
      // Ré-afficher la liste non filtrée
      displayAllDropdownsLists(globalLists, type)
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
    const type = event.target.previousElementSibling.id.split('--')[1]
    globalLists[`${type}Filter`] = []
    displayAllDropdownsLists(globalLists, type)
  })
})

export function updateRecipesCount (globalLists) {
  const recipesCount = globalLists.recipesToDisplay.length
  const recipesNumbersSpan = document.getElementById('recipes__numbers')
  recipesNumbersSpan.textContent = recipesCount
}
