import { createStyles, Theme } from "@material-ui/core";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    buttons: {
      marginTop: spacing(4),
    },
  });

export default styles;
