import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { TypeRecipe } from "types/recipe";
import { useUiStore } from "stores/ui";
import { GET_RECIPE } from "querys/recipe";

import Progress from "components/Progress/Progress";
import { createStore, StoreProvider } from "stores/recipe";
import FormRecipe from "blocks/FormRecipe/FormRecipe";

type RecipeData = {
  recipe: TypeRecipe;
};

type RecipeVars = {
  id: string;
};

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { onApolloError } = useUiStore();

  /**
   * Поскольку после сохранения рецепта нужно покинуть эту страницу, то
   * запрос рецепта сделал "ленивым": он загружается один раз при монтировании компоненты
   */
  const [loadRecipe, { loading, data }] = useLazyQuery<RecipeData, RecipeVars>(
    GET_RECIPE,
    { variables: { id }, onError: onApolloError }
  );

  useEffect(() => {
    loadRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Progress />;

  const rootStore = createStore(data ? data.recipe : undefined);
  return (
    <StoreProvider value={rootStore}>
      <FormRecipe />
    </StoreProvider>
  );
};

export default EditRecipe;
