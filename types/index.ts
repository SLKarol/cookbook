/**
 * Обобщённый паттерн "Только строковые поля"
 */
export type OnlyStringTypes<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ErrorApi {
	status: number;
	message: string;
	data?: { message: string }[];
}

export type FetchGraphQL = (body: string) => any;

/**
 * Тип клика на кнопке
 */
export type OnClickButton = (
	event: React.MouseEvent<HTMLButtonElement> &
		React.KeyboardEvent<HTMLButtonElement>
) => void;
