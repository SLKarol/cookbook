import { withStyles, WithStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { compose } from "recompose";

import styles from "../styles/stylesToolbar";

export type Props = WithStyles<typeof styles>;
export default compose<Props, {}>(
  withStyles(styles, { withTheme: true }),
  observer
);
