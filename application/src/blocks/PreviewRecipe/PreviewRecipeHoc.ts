import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import { TypeRecipe } from "types/recipe";
import styles from "./styles";

export interface PropStyles extends WithStyles<typeof styles> {
  recipe: TypeRecipe;
}

export default compose<PropStyles, { recipe: TypeRecipe }>(
  withStyles(styles, { withTheme: true })
);
