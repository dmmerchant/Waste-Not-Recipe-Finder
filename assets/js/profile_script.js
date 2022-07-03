// Initialize Materialize Components
M.AutoInit();
        
// Define element variables
var dietEl = $("#userDiet");
var allergenEl = $("#userAllergens");

// Function calls
getUserProfile();
renderAllergens(allergenEl);

// Event Listeners
dietEl.on('change', updateDiet);
allergenEl.on('change', 'input', updateAllergen);

