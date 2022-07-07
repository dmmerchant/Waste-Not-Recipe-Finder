var id = getQueryStringValue('id');
var type =getQueryStringValue('type');
var recipeEl = $('#recipe')

function getQueryStringValue(parameter) {
    var currentPageURL = window.location.search.substring(1);
    var queryString = currentPageURL.split('&');
    var getParameter;
    var i;
    for (i = 0; i < queryString.length; i++) {
        getParameter = queryString[i].split('=');
        if (getParameter[0] === parameter) {
            return getParameter[1] === undefined ? true : decodeURIComponent(getParameter[1]);
        }
    }
};

function renderRecipe() {
    if (type === "drink") {
        getDrinkRecipe();
    } else if (type === "food") {
        getFoodRecipe();
    };
}

async function getFoodRecipe() {
    results = await getRecipeCard(id);
    console.log(results.url)
    if(!results.url){
        var recipeImg = $('<h2>Recipe Not Found<h2>')
        recipeImg.appendTo(recipeEl)
    }else {
        var recipeImg = $('<img>')
        recipeImg.attr('src',results.url)
        recipeImg.appendTo(recipeEl)
    }
    
}

async function getDrinkRecipe() {
    results = await searchCoctailRecipe(id);
    results = (JSON.parse(results.contents))
    drink = results.drinks[0]
    console.log(drink)
    
    var cardEl = $('<div class="card">')
    cardEl.css('max-width','500px')
    //Card Image and title
    var cardImgEl = $('<div class="card-image">')
    var imgEl = $('<img>')
    imgEl.attr('src',drink.strDrinkThumb)
    imgEl.appendTo(cardImgEl)
    var cardTitleEl = $('<span class="card-title">')
    cardTitleEl.text(drink.strDrink)
    cardTitleEl.appendTo(cardImgEl)
    cardImgEl.appendTo(cardEl)

    //Card Content - Ingredients
    var cardContentEl = $('<div class="card-content">')
    for (var i = 1; i < 16; i++) {
        var measure = drink['strMeasure' + i]
        var ingredient = drink['strIngredient' + i]
        console.log(ingredient)
        if(ingredient != null && ingredient != "" ){
            var cardContentPEl = $('<p>')
            cardContentPEl.text(ingredient + ' - ' + measure)
            cardContentPEl.appendTo(cardContentEl)
        }     
    }
    cardContentEl.appendTo(cardEl)
    
    //Card Action - Instructions
    var cardActionEl = $('<div class="card-action">')
    var cardActionPel = $('<p>')
    cardActionPel.text(drink.strInstructions)
    cardActionPel.appendTo(cardActionEl)
    cardActionEl.appendTo(cardEl)

    var rowEl = $('<div class="row">')
    var colEl = $('<div class="col s6 offset-s3">')
    cardEl.appendTo(colEl)
    colEl.appendTo(rowEl)
    rowEl.appendTo(recipeEl)
}
renderRecipe()