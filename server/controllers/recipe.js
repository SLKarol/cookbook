const cloudinary = require('cloudinary').v2;

const {
	checkRequestUser,
	prepareNewSteps,
	prepareExistingSteps,
} = require('../lib/recipe');

const Recipe = require('../models/recipe');
const User = require('../models/user');

/**
 * Создать новый рецепт
 */
exports.createRecipe = async ({ recipeInput }, req) => {
	const user = await checkRequestUser(recipeInput, req);
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	const {
		name,
		description,
		cover,
		cookingTime,
		ingredients,
		steps,
	} = recipeInput;
	// Загрузить обложку рецепта
	const coverUpload = await cloudinary.uploader.upload(cover, {
		tags: 'develop_cooking',
	});
	// Подготовить Steps
	const savedSteps = await prepareNewSteps(steps);
	// Создать новый рецепт
	const recipe = new Recipe({
		name,
		description,
		cover: coverUpload.url,
		coverPublicId: coverUpload.public_id,
		cookingTime,
		ingredients,
		steps: savedSteps,
		creator: user,
	});
	// Записать новый рецепт в БД
	const createdRecipe = await recipe.save();
	// Вернуть о новом рецепте
	return {
		...createdRecipe._doc,
		_id: createdRecipe._id.toString(),
		createdAt: createdRecipe.createdAt.toISOString(),
		updatedAt: createdRecipe.updatedAt.toISOString(),
	};
};

exports.recipes = async ({ page, perPage }) => {
	if (!page) {
		page = 1;
	}
	if (!perPage) {
		page = 2;
	}
	const totalRecipes = await Recipe.find().countDocuments();
	const recipes = await Recipe.find()
		.sort({ createdAt: -1 })
		.skip((page - 1) * perPage)
		.limit(perPage)
		.populate('creator');
	return {
		recipes: recipes.map((p) => {
			return {
				...p._doc,
				_id: p._id.toString(),
				createdAt: p.createdAt.toISOString(),
				updatedAt: p.updatedAt.toISOString(),
			};
		}),
		totalRecipes,
	};
};

exports.allRecipes = async () => {
	const totalRecipes = await Recipe.find().countDocuments();
	const recipes = await Recipe.find();
	return {
		recipes: recipes.map((p) => {
			return {
				...p._doc,
				_id: p._id.toString(),
				createdAt: p.createdAt.toISOString(),
				updatedAt: p.updatedAt.toISOString(),
			};
		}),
		totalRecipes,
	};
};

exports.recipe = async ({ id }) => {
	const recipe = await Recipe.findById(id).populate('creator');
	if (!recipe) {
		const error = new Error('Рецепт не найден!');
		error.code = 404;
		throw error;
	}
	return {
		...recipe._doc,
		_id: recipe._id.toString(),
		createdAt: recipe.createdAt.toISOString(),
		updatedAt: recipe.updatedAt.toISOString(),
	};
};

exports.updateRecipe = async ({ id, recipeInput }, req) => {
	await checkRequestUser(recipeInput, req);
	const recipe = await Recipe.findById(id).populate('creator');
	// Валидация данных
	if (!recipe) {
		const error = new Error('Рецепт не найден!');
		error.code = 404;
		throw error;
	}
	if (recipe.creator._id.toString() !== req.userId.toString()) {
		const error = new Error('Не авторизован!');
		error.code = 403;
		throw error;
	}
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	// Запись данных. Простая часть
	recipe.name = recipeInput.name;
	recipe.description = recipeInput.description;
	recipe.cookingTime = recipeInput.cookingTime;
	recipe.ingredients = recipeInput.ingredients;
	// Решение о обложке
	if (recipe.cover !== recipeInput.cover) {
		await cloudinary.api.delete_resources([recipe.coverPublicId]);
		const coverUpload = await cloudinary.uploader.upload(recipeInput.cover, {
			tags: 'develop_cooking',
		});
		recipe.cover = coverUpload.url;
		recipe.coverPublicId = coverUpload.public_id;
	}
	// Задать новые шаги у рецепта
	recipe.steps = await prepareExistingSteps(
		recipeInput.steps,
		recipe.steps.toObject()
	);
	const updatedRecipe = await recipe.save();
	// Отдать ответ
	return {
		...updatedRecipe._doc,
		_id: updatedRecipe._id.toString(),
		createdAt: updatedRecipe.createdAt.toISOString(),
		updatedAt: updatedRecipe.updatedAt.toISOString(),
	};
};

exports.deleteRecipe = async ({ id }, req) => {
	// Проверка авторизации
	if (!req.isAuth) {
		const error = new Error('Not authenticated!');
		error.code = 401;
		throw error;
	}
	const user = await User.findById(req.userId);
	if (!user) {
		const error = new Error('Invalid user.');
		error.code = 401;
		throw error;
	}

	const recipe = await Recipe.findById(id).populate('creator');
	// Валидация данных
	if (!recipe) {
		const error = new Error('Рецепт не найден!');
		error.code = 404;
		throw error;
	}
	if (recipe.creator._id.toString() !== req.userId.toString()) {
		const error = new Error('Не авторизован!');
		error.code = 403;
		throw error;
	}
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	// Удалить oбложку и прочие файлы
	const idsFile = [recipe.coverPublicId];
	recipe.steps.toObject().forEach((s) => {
		if (s.coverPublicId) {
			idsFile.push(s.coverPublicId);
		}
	});
	await cloudinary.api.delete_resources(idsFile);
	// Удалить из БД
	await Recipe.findByIdAndRemove(id);
	return true;
};
