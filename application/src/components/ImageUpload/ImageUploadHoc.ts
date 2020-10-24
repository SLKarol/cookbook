import { withStyles, WithStyles } from "@material-ui/core";

import styles from "./styles";

export interface PropStyles extends WithStyles<typeof styles> {}

export default withStyles(styles, { withTheme: true });
