import { withStyles, WithStyles } from "@material-ui/core";
import { compose } from "recompose";

import { Step } from "types/step";

import styles from "./styles";

type OwnerProps = {
  step: Step;
  title: string;
};

export type PropsComponent = WithStyles<typeof styles> & OwnerProps;

export default compose<PropsComponent, OwnerProps>(
  withStyles(styles, { withTheme: true })
);
