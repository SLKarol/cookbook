import { withStyles, WithStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { compose } from "recompose";

import styles from "./styles";

type OwnerProps = {
  id: string;
};

export type PropsComponent = WithStyles<typeof styles> & OwnerProps;

export default compose<PropsComponent, OwnerProps>(
  withStyles(styles, { withTheme: true }),
  observer
);
