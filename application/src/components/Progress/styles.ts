import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
    },
  });

export default styles;
