import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import styles from "./styles/stylesForm";

export interface PropsStyles extends WithStyles<typeof styles> {}
export default compose<PropsStyles, {}>(
  withStyles(styles, { withTheme: true })
);
