import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import styles from "./styles";

export type PropStyles = WithStyles<typeof styles>;
export default compose<PropStyles, {}>(withStyles(styles, { withTheme: true }));
