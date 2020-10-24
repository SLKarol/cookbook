import { createStyles, Theme } from "@material-ui/core";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    icon: {
      marginRight: spacing(2),
    },
    heroContent: {
      backgroundColor: palette.background.paper,
      padding: spacing(8, 0, 6),
    },
    footer: {
      backgroundColor: palette.background.paper,
      padding: spacing(6),
    },
  });

export default styles;
