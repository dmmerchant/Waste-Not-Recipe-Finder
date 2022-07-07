var bttnSearch = $("#drinkSearch")
var resultCards = $("#resultCards")
var allergenEl = $("#userAllergens");

var dietEl = $("#userDiet");

function searchClick(event) {
    event.preventDefault();
    renderResults()
}

async function renderResults() {
    resultCards.empty();
    ingredients = userProfile.currentDrinkIngredients.map(function(item) {
            return item['tag'];
          });
    results = await searchCoctail_I(ingredients.toString())
    results = (JSON.parse(results.contents))
    results.drinks.forEach(element => {
        //Parent Div
        var colEl = $('<div class="col s12 m4">');
        var cardEl = $("<div class='card'>")

        //Card Image Div
        var cardImgEl = $("<div class='card-image'>");
        var imgEl = $("<img>");
        imgEl.attr('src',element.strDrinkThumb);
        imgEl.appendTo(cardImgEl);
        var iconName = "favorite"
        if (existingFavoriteCheck(element.idDrink,'drink')) {
            iconName="remove"
        }
        var favoriteEl = $('<a class="addFavorite btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">' + iconName + '</i></a>')
        favoriteEl.data({
            id: element.idDrink,
            image: element.strDrinkThumb,
            title: element.strDrink,
            type: 'drink'
        })
        favoriteEl.appendTo(cardImgEl)
        cardImgEl.appendTo(cardEl)
        //Card Content Div
        var cardContentEl = $("<div class='card-content'>");
        //<span class="card-title">Recipe Name</span>
        var cardTitleEl = $('<span class="card-title">');
        cardTitleEl.text(element.strDrink)
        //<p><a href="#">Link to Recipe</a></p>
        var cardLinkEl = $('<p>');
        var cardLinkRefEl = $('<a>Link to Recipe</a></p>');
        cardLinkRefEl.attr('href','./recipe.html?id=' + element.idDrink + '&type=drink')
        cardLinkRefEl.appendTo(cardLinkEl)
        //compile content div
        cardTitleEl.appendTo(cardContentEl)
        cardLinkEl.appendTo(cardContentEl)
        cardContentEl.appendTo(cardEl)
        cardEl.appendTo(colEl)
        colEl.appendTo(resultCards)
    });
}




bttnSearch.on('click',searchClick)
renderAllergens(allergenEl);
allergenEl.on('change', 'input', updateAllergen);
renderResults()

allergenEl.on('change', 'input', updateAllergen);