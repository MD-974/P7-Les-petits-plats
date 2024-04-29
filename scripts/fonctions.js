import { globalLists, setRecipesToDisplay } from './index.js'
import { displayAllDropdownsLists } from './dropdowns.js'

/**************************************************************************************
 * Filtre le tableau global en fonction du type et de la valeur donnés.              **
 * @param {string} type - Le type de filtrage (ingrédients, appareils, ustensiles)   **
 * @param {string} value - La valeur à filtrer                                       **
 * @param {object} globalArray - Le tableau global à filtrer                         **
 * @return {array} Le tableau filtré en fonction du type et de la valeur             **
 *************************************************************************************/
export const filterList = (type, value, globalArray) => {
  // creation tableau temporaire suivant le type de filtrage
  let tempArray = globalArray[type]
  tempArray = tempArray.filter(filter => filter.includes(value))
  // console.log(tempArray)
  return tempArray
}
/***********************************************************************************************
 * Génère une liste non filtrée dans noeud HTML spécifié en utilisant la liste fournie.       **
 * @param {Array} listToUse - liste à utiliser pour générer la liste non filtrée.             **
 * @param {HTMLElement} htmlNode - noeud HTML dans lequel la liste non filtrée sera générée.  **
 * @return {void}                                                                             **
 **********************************************************************************************/
export const generateUnfilterList = (listToUse, htmlNode) => {
  htmlNode.innerHTML = ''
  for (let i = 0; i < listToUse.length; i++) {
    const li = document.createElement('li')
    li.classList.add('dropdown__content__list__item--unfilter')
    li.textContent = listToUse[i]
    htmlNode.appendChild(li)
    // Ajout d'un ecouteur d'evenement pour afficher au click le 'li' cliquer
    li.addEventListener('click', (event) => {
      globalLists.ingredientsFilter.push(event.target.textContent)
      globalLists.appliancesFilter.push(event.target.textContent)
      globalLists.ustensilsFilter.push(event.target.textContent)
      console.log(globalLists)
    })
  }
}
/***************************************************************
 * Fonction pour afficher les tags de filtre.                 **
 * @param {Object} globalLists - les listes globales          **
 * @param {string} type - le type de tag de filtre            **
 * @return {HTMLElement} l'élément de balise de filtre créé   **
 **************************************************************/
export const displayFilterTags = (globalLists) => {
  // console.log(displayFilterTags)
  const filterTagSelected = document.querySelector('.tag__selected')
  filterTagSelected.innerHTML = ''
  const allTags = globalLists.ingredientsSelected.concat(globalLists.appliancesSelected, globalLists.ustensilsSelected, globalLists.searchBarSelected)
  console.log(allTags)
  allTags.forEach((element) => {
    console.log(element)
    const filterTagsContainers = document.createElement('div')
    filterTagsContainers.classList.add('filter__tags__container')
    const tagsClose = document.createElement('span')
    tagsClose.classList.add('fa-solid', 'fa-xmark')
    tagsClose.classList.add('tags__close')
    const filterTags = document.createElement('span')
    filterTags.classList.add('filter__tags')
    filterTags.textContent = element
    filterTagSelected.appendChild(filterTagsContainers)
    filterTagsContainers.appendChild(filterTags)
    filterTags.appendChild(tagsClose)
    // Ajout d'un ecouteur d'evenement pour supprimer au click le 'li' cliquer
    tagsClose.addEventListener('click', (event) => {
      globalLists.ingredientsSelected = globalLists.ingredientsSelected.filter((tag) => tag !== element)
      globalLists.appliancesSelected = globalLists.appliancesSelected.filter((tag) => tag !== element)
      globalLists.ustensilsSelected = globalLists.ustensilsSelected.filter((tag) => tag !== element)
      globalLists.searchBarSelected = globalLists.searchBarSelected.filter((tag) => tag !== element)
      displayFilterTags(globalLists)
      setRecipesToDisplay()
      // displayRecipesList(globalLists)
      // displaySearchBar(globalLists, 'searchBar')
      displayAllDropdownsLists(globalLists, 'ingredients')
      displayAllDropdownsLists(globalLists, 'appliances')
      displayAllDropdownsLists(globalLists, 'ustensils')
    })
  })
}
/************************************************************************************************
* Mise à jour du nombre (span id="recipes__numbers") des recettes affichées sur la page.       **
* @param {Object} globalLists - L'objet des listes globales contenant les recettes à afficher. **
* @return {void} Cette fonction ne retourne rien.                                              **
************************************************************************************************/
export function updateRecipesCount (globalLists) {
  const recipesCount = globalLists.recipesToDisplay.length
  const recipesNumbersSpan = document.getElementById('recipes__numbers')
  recipesNumbersSpan.textContent = recipesCount
}
