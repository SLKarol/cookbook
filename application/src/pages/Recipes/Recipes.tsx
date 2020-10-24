import React from "react";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";

import { ApolloRecipe } from "types/recipe";
import { useUiStore } from "stores/ui";
import { GET_RECIPES_REVIEW } from "querys/recipe";

import PreviewRecipe from "blocks/PreviewRecipe/PreviewRecipe";
import Progress from "components/Progress/Progress";

const Recipes: React.FC = () => {
  const { onApolloError } = useUiStore();

  const { loading, data } = useQuery<ApolloRecipe>(GET_RECIPES_REVIEW, {
    onError: onApolloError,
  });
  if (loading) return <Progress />;
  return (
    <Grid container spacing={4}>
      {data?.recipes.map((recipe) => (
        <PreviewRecipe key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default observer(Recipes);
