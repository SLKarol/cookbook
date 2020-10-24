import { createContext, useContext } from "react";
import { makeObservable, observable, computed, action } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { Step } from "types/step";
import { TypeRecipe, OnlyStringFields, SaveRecipe } from "types/recipe";
import { TypeHandlerSelect } from "types/imageUpload";
import { TOnClick, TypeChangeInput } from "types/types";

export type CreateStore = (value?: TypeRecipe) => RecipeStore;
export class RecipeStore {
  recipe: TypeRecipe;
  userPressSave: boolean;

  constructor(init?: TypeRecipe) {
    makeObservable(this, {
      recipe: observable,
      userPressSave: observable,

      onChangeText: action.bound,
      onSelectImage: action,
      onChangeStep: action,
      onAddStep: action,
      onDeletePhoto: action,
      onDeleteStep: action,
      onSave: action,

      getSteps: computed,
      stepsIds: computed,
      isValidForm: computed,
      name: computed,
      cover: computed,
      description: computed,
      cookingTime: computed,
      ingredients: computed,
      valuesToSave: computed,
    });
    this.userPressSave = false;
    const firstStep: Step = { id: uuidv4(), cover: "", description: "" };
    const {
      cookingTime = "",
      cover = "",
      description = "",
      id = "add",
      name = "",
      ingredients = "",
      steps = [firstStep],
    } = init || {};
    this.recipe = {
      id,
      name,
      cookingTime,
      cover,
      description,
      ingredients,
      steps,
    };
  }

  /**
   * Изменение текстовых значений рецепта
   */
  onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.recipe[name as OnlyStringFields] = value;
  };

  /**
   * Обработчик выбора картинки
   */
  onSelectImage: TypeHandlerSelect = ({ id, imageContent }) => {
    if (imageContent === null) return;
    // Это фото рецепта?
    if (id === "recipe-photo") {
      this.recipe.cover = imageContent.toString();
      return;
    }
    // Найти шаг
    const idx = this.recipe.steps.findIndex((s) => s.id === id);
    this.recipe.steps[idx].cover = imageContent.toString();
  };

  /**
   * Изменить описание шага
   */
  onChangeStep: TypeChangeInput = (e) => {
    const { value, dataset } = e.target;
    const { stepId } = dataset;
    if (!stepId) return;
    const idx = this.recipe.steps.findIndex((s) => s.id === stepId);
    this.recipe.steps[idx].description = value;
  };

  /**
   * Добавить шаг
   */
  onAddStep = () =>
    this.recipe.steps.push({ id: uuidv4(), cover: "", description: "" });

  /**
   * Шаги для вывода на UI
   */
  get getSteps() {
    return this.recipe.steps.map((s, idx) => ({
      id: s.id,
      description: s.description,
      cover: s.cover,
      nameStep: this.recipe.steps.length > 1 ? `Шаг ${idx + 1}` : "",
      canDeleteIt: !!idx,
    }));
  }

  /**
   * Список ID шагов
   */
  get stepsIds() {
    return this.recipe.steps.map((s) => s.id);
  }
  // todo confirm delete
  onDeleteStep: TOnClick = (e) => {
    const { stepId = "" } = e.currentTarget.dataset;
    const idx = this.getStepIndex(stepId);
    this.recipe.steps.splice(idx, 1);
  };
  onDeletePhoto: TOnClick = (e) => {
    const { stepId = "" } = e.currentTarget.dataset;
    const idx = this.getStepIndex(stepId);
    this.recipe.steps[idx].cover = "";
  };

  onSave = () => {
    this.userPressSave = true;
  };

  /**
   * Валидна ли главная форма?
   */
  private isValidMainForm() {
    return Object.entries(this.recipe).reduce((accumulator, item) => {
      if (item[0] !== "steps") {
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
    const { id, steps, ...recipe } = this.recipe;
    let re: SaveRecipe = { ...recipe, steps: [] };
    re.steps = steps.reduce(
      (
        acm: { description: string; cover: string; number: number }[],
        step,
        idx
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, cover, description } = step;
        acm.push({ cover, description, number: idx + 1 });
        return acm;
      },
      []
    );
    if (id !== "add") re.id = id;
    return re;
  }

  /**
   * Поиск индекса в массиве шагов по Id
   * @param id Id шага
   */
  private getStepIndex(id: string) {
    return this.recipe.steps.findIndex((s) => s.id === id);
  }

  get name() {
    return this.recipe.name;
  }
  get cookingTime() {
    return this.recipe.cookingTime;
  }
  get cover() {
    return this.recipe.cover;
  }
  get description() {
    return this.recipe.description;
  }
  get ingredients() {
    return this.recipe.ingredients;
  }
}

export const createStore: CreateStore = (init) => {
  const rootStore = new RecipeStore(init);
  return rootStore;
};

export const StoreContext = createContext<RecipeStore>({} as RecipeStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): RecipeStore => {
  return useContext(StoreContext);
};
