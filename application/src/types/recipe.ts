import { Step } from "./step";
import { OnlyStringTypes } from "./types";

/**
 * Рецепт
 */
export interface TypeRecipe {
  /**
   * ID рецепта
   */
  id: string;
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
   * Ингридиенты к рецепту
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
export type SaveRecipe = Partial<Omit<TypeRecipe, "steps">> & {
  steps: {
    description: string;
    cover: string;
    number: number;
  }[];
};

/**
 * Ответ аполлло-клиенту о рецептах
 */
export type ApolloRecipe = {
  recipes: TypeRecipe[];
};

/**
 * Перечисление типов, где значения- строки (название, описание и т.д.)
 */
export type OnlyStringFields = OnlyStringTypes<TypeRecipe>;
