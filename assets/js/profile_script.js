var allergenEl = $("#userAllergens");

renderAllergens(allergenEl);

allergenEl.on('change', 'input', updateAllergen);