import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    description: {
      marginBottom: spacing(1),
    },
  });

export default styles;
