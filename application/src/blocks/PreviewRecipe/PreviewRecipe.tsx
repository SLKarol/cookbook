import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import withHocs, { PropStyles } from "./PreviewRecipeHoc";

import ButtonGoToLink from "components/ButtonGoToLink/ButtonGoToLink";

/**
 * Предварительный просмотр рецепта
 */
const PreviewRecipe: React.FC<PropStyles> = ({ classes, recipe }) => {
  return (
    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={recipe.cover}
          title={recipe.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <Typography>{recipe.description}</Typography>
        </CardContent>
        <CardActions>
          <ButtonGoToLink
            url={`/view/${recipe.id}`}
            size="small"
            color="primary"
          >
            Смотреть
          </ButtonGoToLink>
          <ButtonGoToLink
            url={`/edit/${recipe.id}`}
            size="small"
            color="primary"
          >
            Редактировать
          </ButtonGoToLink>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default withHocs(PreviewRecipe);
