//Run Materialize Initialize
M.AutoInit();

//#region Global Variables
/* storedUserProfile object notation
{
    allergens: [],
    diet: "text",
    favorites: [{
        id: 
        image:
        title:
        type: "drink"/"food"
    }],
    currentDrinkIngredients:[],
    currentFoodIngredients:[]
}
*/
var resultCards = $("#resultCards")
var userProfile  // Pull from locally stored variable storedUserProfile

var allergenList = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat'
]
//#endregion

//#region Handling User Profile
function getUserProfile() {
    userProfile = JSON.parse(localStorage.getItem("storedUserProfile"));
    //On first run, create an array for the day.
    if (!userProfile) {;
        createBlankProfile();
    }
}

//Creates a blank user profile.
function createBlankProfile() {
    userProfile = {
        allergens: [],
        diet: "",
        favorites: [],
        currentDrinkIngredients:[],
        currentFoodIngredients:[]
    } 
        
    localStorage.setItem("storedUserProfile", JSON.stringify(userProfile)) 
}

//Update Profile
function updateProfile() {
    localStorage.setItem("storedUserProfile", JSON.stringify(userProfile))
}

function updateAllergen(event) {
    event.preventDefault();
    target = $(event.target);
    var allergen = target.data('allergen');
    if (target.is(":checked")) {
        userProfile.allergens.push(allergen)

    } else {
        index = userProfile.allergens.findIndex(thisDetail => thisDetail===allergen);
        userProfile.allergens.splice(index,1)
    };
    console.log(userProfile.allergens)
    updateProfile();
}


function updateFoodIngredients(ingredients) {
    userProfile.currentFoodIngredients = ingredients;
    updateProfile();
}
function updateDrinkIngredients(ingredients) {
    userProfile.currentDrinkIngredients = ingredients;
    updateProfile();
}

function updateFavorites(idAction,idData,imageData,titleData,typeData) {
    if (!idAction) {
        userProfile.favorites.push({
            id: idData,
            image: imageData,
            title: titleData,
            type: typeData
        });
    } else {
        const index = userProfile.favorites.findIndex((favorite) => {
            return favorite.id === idData && favorite.type === typeData
          });
        userProfile.favorites.splice(index,1)
    };
    updateProfile();
}

function existingFavoriteCheck(idData,idType) {
    var favCheck = userProfile.favorites.filter(function(v){ return v["id"] == idData && v["type"] == idType; })
    if (favCheck.length === 0) {
        return false
    } else {
        return true
    }
}

//#endregion

//#region Commonly Used Functions

function renderAllergens(location) {
    console.log(allergenList)
    allergenList.forEach(allergen => {
        var checked = ""
    if (userProfile.allergens.includes(allergen)) {
        checked = ' checked="checked" '
    };
    var checkBoxEl = $('<p><label><input type="checkbox" data-allergen="' + allergen + '" class="' + 'filled-in" ' +  checked + ' /><span>' + allergen + '</span></label></p>');
    console.log(checkBoxEl);
    checkBoxEl.appendTo(location)
    })
}

function addFavorites(event) {
    event.preventDefault();
    target = $(event.target);
    parentTarget = $(event.target).parent();
    var id=parentTarget.data('id');
    var image = parentTarget.data('image');
    var title = parentTarget.data('title');
    var type = parentTarget.data('type');
    var action = existingFavoriteCheck(id,type);
    updateFavorites(action,id,image,title,type);
    if (action) {
        target.text("favorite")
    } else {
        target.text("remove")
    }
}

resultCards.on('click','.addFavorite',addFavorites)

//Setup Diet Select
document.addEventListener('DOMContentLoaded', function() {
    var dietSelect = document.querySelectorAll('#userDiet');
    M.FormSelect.init(dietSelect, {});
    if (!userProfile.diet || dietSelect.length === 0) {
        // Do nothing
    }
    else {
        var userDiet = document.querySelector('select');
        var instance = M.FormSelect.getInstance(userDiet);
        for(var i = 0; i<userDiet.length; i++) {
            if (userDiet.options[i].innerText === userProfile.diet) {
                instance.input.value = userProfile.diet;
            }
            else {
                // Do nothing
            }
        }
        
    }
    

    var dietEl = $('#userDiet');
    dietEl.on('change', function() {
        var dietSelect = M.FormSelect.getInstance(dietEl);
        console.log(dietSelect.input.value);
        userProfile.diet = dietSelect.input.value;

        updateProfile();
    })
});

//Setup Chip Inputs
document.addEventListener('DOMContentLoaded', function() {
    var foodChips = document.querySelectorAll('#foodIngredients');
    var drinkChips = document.querySelectorAll('#drinkIngredients');
    M.Chips.init(foodChips, {
        data: userProfile.currentFoodIngredients,
        placeholder: "Add Ingredients",
        secondaryPlaceholder: "+ Ingredient",
        onChipAdd: chipsInput,
        onChipDelete: chipsInput
    });
    M.Chips.init(drinkChips, {
        data: userProfile.currentDrinkIngredients,
        placeholder: "Add Ingredients",
        secondaryPlaceholder: "+ Ingredient",
        onChipAdd: chipsInput,
        onChipDelete: chipsInput
    });
    function chipsInput() {
        var parentEl = this.el.id;
        console.log(parentEl);
        var instance = M.Chips.getInstance(this.el);
        var ingredients = instance.chipsData.map(function(item) {
            return item;
          });
        if (parentEl === "drinkIngredients") {
            updateDrinkIngredients(ingredients)
        } else if (parentEl === "foodIngredients") {
            updateFoodIngredients(ingredients)
        }
    };
  });  
//#endregion

//#region API Functions

//#region Spoonacular APIs

var spoonacularKey = '802da09f12f34593b83b58c5932e27a2'
var defaultResults = 10
function addKey(URL,searchFunction) {
    var apiKey = 'apiKey='+spoonacularKey
    if (searchFunction) {
        return URL + '&number=' + defaultResults + '&' + apiKey
}else {
    return URL + apiKey
}
}

async function getFoodFact() {
    var requestUrl = 'https://api.spoonacular.com/food/trivia/random?';
    requestUrl = addKey(requestUrl,false)
    const response = await fetch(requestUrl)
    if(!response.ok) {
        const message = response.status;
        throw new Error('An error has occured:' + message);
    } 
    return response.json()
    }

async function searchRecipesAPI(ingredients) {
    var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?includeIngredients=' + ingredients;
    if (!userProfile.diet && userProfile.diet != ""){
        requestUrl = requestUrl + '&diet=' + userProfile.diet
    }
    console.log(userProfile.allergens)
    if (userProfile.allergens.toString() != "") {
        requestUrl = requestUrl + '&intolerances=' + userProfile.allergens.toString()
    }
    requestUrl = addKey(requestUrl,true);
    console.log(requestUrl);
    const response = await fetch(requestUrl)
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }  
    return response.json()
    }

async function getRecipeCard(id) {
        var requestUrl = 'https://api.spoonacular.com/recipes/' + id + '/card?';
        requestUrl = addKey(requestUrl,false)
        const response = await fetch(requestUrl)
        if(!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }  
        return response.json()
        }
  //#endregion

  //#region CoctailDB APIs
  var coctailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/"
  
  function useAllOrigins(url){
    return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  }

  async function searchCoctail_I(ingredients) {
    var requestUrl = coctailUrl + "filter.php?i="+ingredients;
    var requestProxyURL = useAllOrigins(requestUrl);
    
    console.log(requestUrl)
    const response = await fetch(requestProxyURL)
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    } 
    return response.json()
  }

  async function searchCoctailRecipe(id) {
    var requestUrl = coctailUrl + "lookup.php?i="+id;
    var requestProxyURL = useAllOrigins(requestUrl);
    
    console.log(requestUrl)
    const response = await fetch(requestProxyURL)
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    } 
    return response.json()
  }
  //#endregion
  
//#endregion

getUserProfile();

console.log(userProfile)