//Element Variables
var factEl = $("#foodFact")
var allergenEl = $("#userAllergens")

//Rendering Functions
async function setFact(){
    const fact = await getFoodFact();
    factEl.text(fact.text)
}


async function searchRecipes(ingredients){
    results = await searchRecipesAPI(ingredients);
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
getUserProfile();
renderAllergens(allergenEl);

allergenEl.on('change', 'input', updateAllergen);