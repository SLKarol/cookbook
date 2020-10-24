import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { TypeRecipe } from "types/recipe";
import { useUiStore } from "stores/ui";

import { GET_RECIPE } from "querys/recipe";
import withHocs, { PropStyles } from "./ViewRecipeHoc";
import Progress from "components/Progress/Progress";
import Recipe from "blocks/FullViewRecipe/FullViewRecipe";

type RecipeData = {
  recipe: TypeRecipe;
};

type RecipeVars = {
  id: string;
};

/**
 * Поскольку после сохранения рецепта нужно покинуть эту страницу, то
 * запрос рецепта сделал "ленивым": он загружается один раз при монтировании компоненты
 */
const ViewRecipe: React.FC<PropStyles> = () => {
  const { id } = useParams<{ id: string }>();
  const { onApolloError } = useUiStore();
  const [loadRecipe, { loading, data }] = useLazyQuery<RecipeData, RecipeVars>(
    GET_RECIPE,
    {
      variables: { id },
      onError: onApolloError,
    }
  );
  useEffect(() => {
    loadRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Progress />;
  if (data) return <Recipe recipe={data.recipe} />;
  return <div>Нет данных</div>;
};

export default withHocs(ViewRecipe);
