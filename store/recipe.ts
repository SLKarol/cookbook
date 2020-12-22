import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { OnClickButton, OnlyStringTypes } from 'types';
import { TypeHandlerSelect } from 'types/imageUpload';

import { SaveRecipe, TypeRecipe } from 'types/recipe';
import { ResultValid } from 'types/validate';

import type { RootStore } from './index';
import { Step, StepExport } from 'types/step';

export class Recipe {
	rootStore: RootStore;

	recipe: TypeRecipe;

	/**
	 * Проверять форму на валидность?
	 */
	checkFormValid: boolean;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;
		const firstStep: Step = { _id: uuidv4(), cover: '', description: '' };

		this.checkFormValid = false;
		this.recipe = {
			_id: '',
			name: '',
			cookingTime: '',
			cover: '',
			description: '',
			ingredients: '',
			steps: [firstStep],
		};
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		this.recipe[id as OnlyStringTypes<TypeRecipe>] = value;
	};

	get formIsValid(): ResultValid {
		return {} as ResultValid;
	}

	/**
	 * Обработчик выбора картинки
	 */
	onSelectImage: TypeHandlerSelect = ({ id, imageContent }) => {
		if (imageContent === null) return;
		// Это фото рецепта?
		if (id === 'recipe-photo') {
			this.recipe.cover = imageContent.toString();
			return;
		}
		// Найти шаг
		const idx = this.recipe.steps.findIndex((s) => s._id === id);
		this.recipe.steps[idx].cover = imageContent.toString();
	};

	/**
	 * Шаги для вывода на UI
	 */
	get recipeSteps() {
		return this.recipe.steps.map((s, idx) => ({
			_id: s._id,
			description: s.description,
			cover: s.cover,
			nameStep: this.recipe.steps.length > 1 ? `Шаг ${idx + 1}` : '',
			canDeleteIt: !!idx,
		}));
	}

	/**
	 * Изменить описание шага
	 */
	onChangeStep = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value, dataset } = e.target;
		const { stepId } = dataset;
		if (!stepId) return;
		const idx = this.recipe.steps.findIndex((s) => s._id === stepId);
		this.recipe.steps[idx].description = value;
	};

	/**
	 * Создаёт новый рецепт ИЛИ получает рецепт из настроек
	 */
	createRecipe = (recipe?: TypeRecipe) => {
		// Создаёт новый рецепт
		if (!recipe) {
			const firstStep: Step = { _id: uuidv4(), cover: '', description: '' };

			this.checkFormValid = false;
			this.recipe = {
				_id: '',
				name: '',
				cookingTime: '',
				cover: '',
				description: '',
				ingredients: '',
				steps: [firstStep],
			};
			return;
		}
		// получает рецепт из настроек
		this.recipe = recipe;
		this.checkFormValid = false;
	};

	/**
	 * Добавить шаг
	 */
	onAddStep = () =>
		this.recipe.steps.push({ _id: uuidv4(), cover: '', description: '' });

	onDeleteStep: OnClickButton = (e) => {
		const { stepId = '' } = e.currentTarget.dataset;
		const idx = this.getStepIndex(stepId);
		this.recipe.steps.splice(idx, 1);
	};
	onDeletePhoto: OnClickButton = (e) => {
		const { stepId = '' } = e.currentTarget.dataset;
		const idx = this.getStepIndex(stepId);
		this.recipe.steps[idx].cover = '';
	};

	/**
	 * Поиск индекса в массиве шагов по Id
	 * @param id Id шага
	 */
	private getStepIndex(id: string) {
		return this.recipe.steps.findIndex((s) => s._id === id);
	}

	setCheckFormValid = (check: boolean) => {
		this.checkFormValid = check;
	};

	/**
	 * Валидна ли главная форма?
	 */
	private isValidMainForm() {
		return Object.entries(this.recipe).reduce((accumulator, item) => {
			if (item[0] !== 'steps') {
				return accumulator && (item[1] as string).length > 0;
			}
			return accumulator;
		}, true);
	}

	/**
	 * Шаги рецепта валидны?
	 */
	private isValidPropsStep() {
		return this.recipe.steps.reduce(
			(accumulator, step) => accumulator && step.description.length > 0,
			true
		);
	}

	/**
	 * Объединённый ответ: Вся форма валидная?
	 */
	get isValidForm() {
		return this.isValidMainForm() && this.isValidPropsStep();
	}

	get valuesToSave() {
		const { _id, steps, ...recipe } = this.recipe;
		let re: SaveRecipe = { ...recipe, steps: [] };
		re.steps = steps.reduce((acm: StepExport[], step, idx) => {
			const { cover, description } = step;
			acm.push({ cover, description, number: idx + 1 });
			return acm;
		}, []);
		if (_id !== 'add') re._id = _id;
		return re;
	}
}
