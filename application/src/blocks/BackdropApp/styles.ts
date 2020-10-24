import { createStyles, Theme } from "@material-ui/core";

const styles = ({ zIndex }: Theme) =>
  createStyles({
    backdrop: {
      zIndex: zIndex.drawer + 1,
      color: "#fff",
    },
  });

export default styles;
