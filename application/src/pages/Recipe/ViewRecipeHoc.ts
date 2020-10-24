import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import styles from "../Recipes/styles";

export interface PropStyles extends WithStyles<typeof styles> {}

export default compose<PropStyles, {}>(withStyles(styles, { withTheme: true }));
