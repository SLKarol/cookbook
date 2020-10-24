import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    paper: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
    },
    steps: {
      width: "100%",
    },
    actions: {
      justifyContent: "flex-end",
    },
  });

export default styles;
