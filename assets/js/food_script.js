var bttnSearch = $("#foodSearch")
var resultCards = $("#resultCards")
var allergenEl = $("#userAllergens");

var dietEl = $("#userDiet");

function searchClick(event) {
    event.preventDefault();
    renderResults()
}

async function renderResults() {
    resultCards.empty();
    ingredients = userProfile.currentFoodIngredients.map(function(item) {
            return item['tag'];
          });
    console.log(ingredients.toString());
    results = await searchRecipesAPI(ingredients.toString());
    results.results.forEach(element => {
        //Parent Div
        var colEl = $('<div class="col s12 m4">');
        var cardEl = $("<div class='card'>")
        
        //Card Image Div
        var iconName = "favorite"
        if (existingFavoriteCheck(element.id,'food')) {
            iconName="remove"
        }
        var cardImgEl = $("<div class='card-image'>");
        var imgEl = $("<img>");
        imgEl.attr('src',element.image);
        imgEl.appendTo(cardImgEl);
        var favoriteEl = $('<a class="addFavorite btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">' + iconName + '</i></a>')
        favoriteEl.data({
            id: element.id,
            image: element.image,
            title: element.title,
            type: 'food'
        })
        favoriteEl.appendTo(cardImgEl)
        cardImgEl.appendTo(cardEl)
        //Card Content Div
        var cardContentEl = $("<div class='card-content'>");
        //<span class="card-title">Recipe Name</span>
        var cardTitleEl = $('<span class="card-title">');
        cardTitleEl.text(element.title)
        //<p><a href="#">Link to Recipe</a></p>
        var cardLinkEl = $('<p>');
        var cardLinkRefEl = $('<a>Link to Recipe</a></p>');
        cardLinkRefEl.attr('href','./recipe.html?id=' + element.id + '&type=drink')
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
renderResults();
allergenEl.on('change', 'input', updateAllergen);


allergenEl.on('change', 'input', updateAllergen);