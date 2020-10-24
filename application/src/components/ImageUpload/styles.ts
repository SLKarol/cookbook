import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    inputFile: {
      display: "none",
    },
    card: {
      maxWidth: 345,
    },
  });

export default styles;
