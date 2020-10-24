import { withStyles, WithStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { compose } from "recompose";

import styles from "./styles";

export interface PropsStyles extends WithStyles<typeof styles> {}
export default compose<PropsStyles, {}>(
  withStyles(styles, { withTheme: true }),
  observer
);
