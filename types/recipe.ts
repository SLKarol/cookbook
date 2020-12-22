import { Step } from './step';
import { ErrorApi, OnlyStringTypes } from 'types';

/**
 * Рецепт
 */
export interface TypeRecipe {
	/**
	 * ID рецепта
	 */
	_id: string;
	/**
	 * Название рецепта
	 */
	name: string;
	/**
	 * Фото
	 */
	cover: string;
	/**
	 * Описание рецепта
	 */
	description: string;
	/**
	 * Время приготовления
	 */
	cookingTime: string;
	/**
	 * Ингредиенты к рецепту
	 */
	ingredients: string;
	/**
	 * Шаги рецепта
	 */
	steps: Step[];
}

/**
 * Рецепт для сохранения на сервере
 */
export type SaveRecipe = Partial<Omit<TypeRecipe, 'steps'>> & {
	steps: {
		description: string;
		cover: string;
		number: number;
	}[];
};

/**
 * Ответ аполлло-клиенту о рецептах
 */
export interface RecipeResponse extends TypeRecipe {
	creator: {
		_id: string;
		name: string;
	};
	createdAt: string;
}

/**
 * Перечисление типов, где значения- строки (название, описание и т.д.)
 */
export type OnlyStringFields = OnlyStringTypes<TypeRecipe>;

export interface RecipePreview {
	_id: string;
	cover: string;
	createdAt: string;
	creator: { name: string };
	description: string;
	name: string;
}

export type ResponsePreview = {
	data: {
		recipes: {
			recipes: RecipePreview[];
			totalRecipes: number;
		};
	};
	errors?: ErrorApi[];
};

export type ResponseListRecipe = {
	data: { recipe: RecipeResponse };
	errors?: ErrorApi[];
};
