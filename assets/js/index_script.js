//Element Variables
var factEl = $("#foodFact")
var allergenEl = $("#userAllergens")

//Rendering Functions
async function setFact(){
    const fact = await getFoodFact();
    factEl.text(fact.text)
}


async function searchRecipes(ingredients,diet,allergens){
    results = await searchRecipesAPI(ingredients,diet,allergens);
    console.log(results)
}

//#region Event Listeners
/*
NavigationBar
GoToFavorites
Add Ingredient (Food)
Add Ingredient (Drink)
Remove Ingredient (Food)
Remove Ingredient (Drink)
Submit Search (Food)
Submit Search (Drink)
*/
//#endregion
getUserProfile()
setFact()
searchRecipes()
renderAllergens(allergenEl)

allergenEl.on('change', 'input',updateAllergen)