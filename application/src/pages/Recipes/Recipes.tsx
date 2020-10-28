import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useLazyQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";

import { ApolloRecipe } from "types/recipe";
import { useUiStore } from "stores/ui";
import { GET_RECIPES_REVIEW } from "querys/recipe";

import PreviewRecipe from "blocks/PreviewRecipe/PreviewRecipe";
import Progress from "components/Progress/Progress";

const Recipes: React.FC = () => {
  const { onApolloError } = useUiStore();

  const [loadGreeting, { called, loading, data }] = useLazyQuery<ApolloRecipe>(
    GET_RECIPES_REVIEW,
    { onError: onApolloError }
  );

  // Загрузка рецептов
  useEffect(() => {
    if (!called) {
      loadGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (called && loading) return <Progress />;

  return (
    <Grid container spacing={4}>
      {data?.recipes.map((recipe) => (
        <PreviewRecipe key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default observer(Recipes);
