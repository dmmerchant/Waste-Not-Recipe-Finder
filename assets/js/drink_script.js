var bttnSearch = $("#drinkSearch")

async function renderResults(event) {
    event.preventDefault();
    ingredients = userProfile.currentDrinkIngredients.map(function(item) {
            return item['tag'];
          });
    results = await searchCoctail_I(ingredients.toString())
    results = (JSON.parse(results.contents))
    results.drinks.forEach(element => {
        console.log(element)
    });
}


bttnSearch.on('click',renderResults)