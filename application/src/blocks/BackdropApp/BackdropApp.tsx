import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useUiStore } from "stores/ui";
import withHocs, { PropsStyles } from "./BackdropAppHoc";

/**
 * Сделать недоступным приложение
 */
const BackdropApp: React.FC<PropsStyles> = ({ classes }) => {
  const { backdropShow } = useUiStore();

  return (
    <Backdrop className={classes.backdrop} open={backdropShow}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default withHocs(BackdropApp);
