import { withStyles, WithStyles } from "@material-ui/core";

import styles from "../styles/stylesToolbar";

export interface PropsStyles extends WithStyles<typeof styles> {}
export default withStyles(styles, { withTheme: true });
