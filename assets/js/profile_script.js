// Initialize Materialize Components
M.AutoInit();
        
// Define element variables
var saveBtn = $("#saveSettings");
var allergenEl = $("#userAllergens");

// Function calls
getUserProfile();
renderAllergens(allergenEl);
saveBtn.on('click', updateDiet);
saveBtn.on('click', updateCurrentIngredients);
allergenEl.on('change', 'input', updateAllergen);

