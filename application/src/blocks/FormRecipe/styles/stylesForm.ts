import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: spacing(1),
      },
    },
  });

export default styles;
