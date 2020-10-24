import { createStyles, Theme } from "@material-ui/core";

const styles = ({ typography }: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontWeight: typography.fontWeightRegular,
    },
    detail: {
      flexDirection: "column",
    },
    photo: {
      maxWidth: "100%",
    },
  });

export default styles;
