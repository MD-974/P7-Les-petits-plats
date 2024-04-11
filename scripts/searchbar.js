// import { recipe } from '../data/recipes.js'
// import { globalLists } from './index.js'

// const mainSearchBar = document.getElementById('input_search')
// mainSearchBar.addEventListener('input', (event) => {
//   const resultsArray = []

//   if (event.target.value.length >= 3) {
//     const userSearch = event.target.value
//     const userSearchTrimmed = userSearch.trim()
//     const userSearchSplit = userSearchTrimmed.split(' ')

//     for (let i = 0; i < userSearchSplit.length; i++) {
//       const world = userSearchSplit[i]
//       for (let j = 0; j < globalLists.recipesToDisplay.length; j++) {
//         if (recipe.name.toLowerCase().includes(world.toLowerCase())) {
//           resultsArray.push(recipe)
//         } else if (recipe.description.toLowerCase().includes(world.toLowerCase())) {
//           resultsArray.push(recipe)
//         }
//       }
//     }
//   }
// })
