/**
 * Filtre le tableau global en fonction du type et de la valeur donnés.
 * @param {string} type - Le type de filtrage (ingrédients, appareils, ustensiles)
 * @param {string} value - La valeur à filtrer
 * @param {object} globalArray - Le tableau global à filtrer
 * @return {array} Le tableau filtré en fonction du type et de la valeur
 */

export const filterList = (type, value, globalArray) => {
  console.log(type)
  console.log(globalArray)
  // creation tableau temporaire suivant le type de filtrage
  let tempArray = globalArray[type]
  tempArray = tempArray.filter(filter => filter.includes(value))
  // console.log(tempArray)
  return tempArray
}

export const generateUnfilterList = (listToUse, htmlNode) => {
  htmlNode.innerHTML = ''
  for (let i = 0; i < listToUse.length; i++) {
    const li = document.createElement('li')
    li.classList.add('dropdown__content__list__item--unfilter')
    li.textContent = listToUse[i]
    htmlNode.appendChild(li)
  }
}
