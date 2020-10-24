import { createStyles, Theme } from "@material-ui/core";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    cardGrid: {
      paddingTop: spacing(8),
      paddingBottom: spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  });

export default styles;
