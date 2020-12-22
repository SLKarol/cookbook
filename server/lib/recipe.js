const validator = require('validator');
const cloudinary = require('cloudinary').v2;

const User = require('../models/user');

/**
 * Проверка валидность вводимых данных по рецепту
 * @param {object} recipeInput Введённые данные по рецепту
 * @param {Array} errors Массив, в котором собираются ошибки
 */
function validateRecipe(recipeInput, errors) {
	const {
		name,
		description,
		cover,
		cookingTime,
		ingredients,
		steps,
	} = recipeInput;
	if (validator.isEmpty(name)) {
		errors.push({ message: 'Не заполнено Название.' });
	}
	if (validator.isEmpty(description)) {
		errors.push({ message: 'Не заполнено Описание.' });
	}
	if (validator.isEmpty(cover)) {
		errors.push({ message: 'Не найдено изображение.' });
	}
	if (validator.isEmpty(cookingTime)) {
		errors.push({ message: 'Не заполнено Время готовки.' });
	}
	if (validator.isEmpty(ingredients)) {
		errors.push({ message: 'Не заполнен Состав рецепта.' });
	}
	if (!Array.isArray(steps) || steps.length === 0) {
		errors.push({ message: 'Не заполнены Шаги приготовления.' });
	}
	return errors;
}

/**
 * Проверка валидности данных, проверка логинившегося юзера
 */
exports.checkRequestUser = async (recipeInput, req) => {
	// Проверка авторизации
	if (!req.isAuth) {
		const error = new Error('Not authenticated!');
		error.code = 401;
		throw error;
	}
	// Проверка валидации
	const errors = validateRecipe(recipeInput, []);
	if (errors.length > 0) {
		const error = new Error('Не корректный ввод данных.');
		error.data = errors;
		error.code = 422;
		throw error;
	}
	const user = await User.findById(req.userId);
	if (!user) {
		const error = new Error('Invalid user.');
		error.code = 401;
		throw error;
	}
	return user;
};

/**
 * Подготовить шаги для нового рецепта
 */
exports.prepareNewSteps = async (steps) => {
	const re = [];
	for (const step of steps) {
		const { number, description, cover = '' } = step;
		const newStep = { number, description, cover };
		// Если загрузил картинку, давай её запишем в хранилище
		if (cover) {
			const coverUpload = await cloudinary.uploader.upload(cover, {
				tags: 'develop_cooking_step',
			});
			newStep.cover = coverUpload.url;
			newStep.coverPublicId = coverUpload.public_id;
		}
		re.push(newStep);
	}
	return re;
};

/**
 * Подготовить шаги приготовления у существующего рецепта
 * @param {Array} steps Шаги приготовления
 * @param {Array} existingSteps Существующие шаги
 */
exports.prepareExistingSteps = async (steps, existingSteps) => {
	const re = [];
	for (const step of steps) {
		// Существующий шаг
		const existStep = existingSteps.find((s) => s.number === step.number);
		// Если шаг существует и обложка не изменилась, то не загружать обложку
		if (existStep && step.cover === existStep.cover) {
			step.coverPublicId = existStep.coverPublicId;
		} else {
			// Иначе в существующем шаге удалить обложку
			if (existStep) {
				await cloudinary.api.delete_resources([existStep.coverPublicId]);
			}
			// Если клиент прислал обложку, то загрузи её
			if (step.cover) {
				const coverUpload = await cloudinary.uploader.upload(step.cover, {
					tags: 'develop_cooking_step',
				});
				step.cover = coverUpload.url;
				step.coverPublicId = coverUpload.public_id;
			}
		}
		re.push(step);
	}

	return re;
};
