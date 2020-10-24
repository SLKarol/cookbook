import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import withHocs, { PropsComponent } from "./FullViewRecipeHoc";
import EscapedNewLineToLineBreakTag from "components/EscapedNewLineToLineBreakTag/EscapedNewLineToLineBreakTag";
import Step from "./Step/Step";
import ButtonGoToLink from "components/ButtonGoToLink/ButtonGoToLink";

/**
 * Вывести весь рецепт на экран
 */
const FullViewRecipe: React.FC<PropsComponent> = ({ recipe, classes }) => {
  const { name, cover, description, cookingTime, ingredients, steps } = recipe;

  const getTitleStep = (idxStep: number) =>
    steps.length > 1 ? `Шаг ${idxStep + 1}` : "";

  return (
    <Paper className={classes.paper}>
      <Card>
        <CardHeader
          title={name}
          subheader={`Время приготовления: ${cookingTime}`}
        />
        <CardMedia component="img" image={cover} title={name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="h6" component="h6">
            Ингридиенты:
          </Typography>
          <Typography>
            <EscapedNewLineToLineBreakTag string={ingredients} />
          </Typography>
          <Typography variant="h6" component="h6">
            Шаги приготовления:
          </Typography>
          <div className={classes.steps}>
            {steps.map((s, idx) => (
              <Step key={s.id} step={s} title={getTitleStep(idx)} />
            ))}
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <ButtonGoToLink size="small" color="primary">
            Назад
          </ButtonGoToLink>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default withHocs(FullViewRecipe);
