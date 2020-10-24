import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: spacing(3),
      marginLeft: spacing(1),
    },
  });

export default styles;
