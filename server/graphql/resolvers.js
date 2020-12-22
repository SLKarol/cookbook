const { createUser, login } = require('../controllers/user');
const {
	createRecipe,
	recipes,
	allRecipes,
	recipe,
	updateRecipe,
	deleteRecipe,
} = require('../controllers/recipe');

module.exports = {
	createUser,
	login,
	createRecipe,
	recipes,
	allRecipes,
	recipe,
	updateRecipe,
	deleteRecipe,
};
