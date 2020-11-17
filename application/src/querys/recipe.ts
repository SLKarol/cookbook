import { gql } from "@apollo/client";

/**
 * Получение списка рецептов
 */
export const GET_RECIPES_REVIEW = gql`
  query {
    recipes {
      id
      name
      description
      cover
    }
  }
`;

/**
 * Получить рецепт для показать-редактировать
 */
export const GET_RECIPE = gql`
  query GetRecipe($id: ID) {
    recipe(id: $id) {
      id
      name
      description
      cover
      cookingTime
      ingredients
      steps {
        id
        cover
        description
      }
    }
  }
`;

/**
 * Добавить рецепт
 */
export const ADD_RECIPE = gql`
  mutation insertOneRecipe(
    $name: String!
    $description: String!
    $cookingTime: String!
    $cover: String!
    $ingredients: String!
    $steps: [stepInput]!
  ) {
    insertOneRecipe(
      name: $name
      description: $description
      cookingTime: $cookingTime
      ingredients: $ingredients
      cover: $cover
      steps: $steps
    ) {
      id
    }
  }
`;

/**
 * Редактировать рецепт
 */
export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $id: ID
    $name: String!
    $description: String!
    $cookingTime: String!
    $cover: String!
    $ingredients: String!
    $steps: [stepInput]!
  ) {
    updateRecipe(
      id: $id
      name: $name
      description: $description
      cookingTime: $cookingTime
      ingredients: $ingredients
      cover: $cover
      steps: $steps
    ) {
      steps {
        id
      }
    }
  }
`;

/**
 * Удалить рецепт
 */
export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID) {
    deleteRecipe(id: $id) {
      name
    }
  }
`;
