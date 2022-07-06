
var allergenEl = $("#userAllergens");
var dietEl = $("#userDiet");

renderAllergens(allergenEl);
renderDiet(dietEl);

allergenEl.on('change', 'input', updateAllergen);
dietEl.on('change', updateDiet);

