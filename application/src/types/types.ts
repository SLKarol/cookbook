/**
 * Обобщённый паттерн "Только строковые поля"
 */
export type OnlyStringTypes<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

/**
 * Тип обработчика ввода с клавиатуры
 */
export type TypeChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Тип обработки нажатия мышкой
 */
export type TOnClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;
