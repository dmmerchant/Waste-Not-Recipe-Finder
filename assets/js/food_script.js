var bttnSearch = $("#foodSearch")

async function renderResults(event) {
    event.preventDefault();
    ingredients = userProfile.currentFoodIngredients.map(function(item) {
            return item['tag'];
          });
    console.log(ingredients.toString());
    results = await searchRecipesAPI(ingredients.toString())
    results.results.forEach(element => {
        console.log(element)
    });
}


bttnSearch.on('click',renderResults)