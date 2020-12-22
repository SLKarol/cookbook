import { makeAutoObservable } from 'mobx';

import { OnlyStringTypes } from 'types';
import { Validator, ValidResult } from 'types/validate';

import { email, length, required } from 'lib/validators';

import type { RootStore } from './index';

const validators: Validator = {
	email: [required, email],
	password: [required, length({ min: 5 })],
	name: [required],
};

export class User {
	rootStore: RootStore;

	email: string;
	name: string;
	password: string;

	checkFormValid: boolean;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore;

		this.email = '';
		this.name = '';
		this.password = '';
		this.checkFormValid = false;
	}

	/**
	 * Когда изменилось текстовое значение на форме, записать в стор
	 */
	onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		this[id as OnlyStringTypes<User>] = value;
	};

	/**
	 * Установить признак нажатия на "Отправить"
	 */
	setCheckFormValid = () => {
		this.checkFormValid = true;
	};

	get formIsValid() {
		// Пройтись по всем значениям и вычислить валидность данных
		const fieldValid: ValidResult = {};
		for (const [key, value] of Object.entries(validators)) {
			let isValid = true;
			for (const validator of value) {
				isValid = isValid && validator(this[key as OnlyStringTypes<User>]);
			}
			fieldValid[key] = isValid;
		}
		// Итоговый вывод по валидности формы
		const formIsValid = Object.values(fieldValid).reduce(
			(a, v) => a && v,
			true
		);
		return {
			formIsValid,
			fieldValid,
		};
	}

	clearInput = () => {
		this.email = '';
		this.checkFormValid = false;
		this.name = '';
		this.password = '';
	};
}
