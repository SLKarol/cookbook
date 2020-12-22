/**
 * Сигнатура ф-ции, определяющей валидность строкового значения
 */
export type ValidFunc = (value: string) => boolean;

/**
 * Данные о валидности значений
 */
export interface Validator {
	[key: string]: ValidFunc[];
}

/**
 * Список валидных полей
 */
export interface ValidResult {
	[key: string]: boolean;
}

export interface ResultValid {
	formIsValid: boolean;
	fieldValid: ValidResult;
	checkFormValid: boolean;
}
