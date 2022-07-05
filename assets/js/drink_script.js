var bttnSearch = $("#drinkSearch")
var resultCards = $("#resultCards")

async function renderResults(event) {
    event.preventDefault();
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
        var favoriteEl = $('<a class="addFavorite btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite</i></a>')
        favoriteEl.attr({
            'data-id': element.idDrink,
            'data-img': element.strDrinkThumb,
            'data-title': element.strDrink,
            'data-type': 'drink'
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
        var cardLinkRefEl = $('<a target="_blank">Link to Recipe</a></p>');
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


bttnSearch.on('click',renderResults)