import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import { TypeRecipe } from "types/recipe";

import styles from "./styles";

type OwnerProps = {
  recipe: TypeRecipe;
};

export type PropsComponent = WithStyles<typeof styles> & OwnerProps;

export default compose<PropsComponent, OwnerProps>(
  withStyles(styles, { withTheme: true })
);
