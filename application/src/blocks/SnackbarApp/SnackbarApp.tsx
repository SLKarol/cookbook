import React from "react";
import { observer } from "mobx-react-lite";
import Snackbar from "@material-ui/core/Snackbar";

import { useUiStore } from "stores/ui";
import Alert from "./Alert";

const SnackbarApp: React.FC = () => {
  const {
    hideSnackbar,
    snackbarShow,
    snackbarText,
    snackbarType,
  } = useUiStore();
  return (
    <Snackbar
      open={snackbarShow}
      autoHideDuration={6000}
      onClose={hideSnackbar}
    >
      <Alert onClose={hideSnackbar} severity={snackbarType}>
        {snackbarText}
      </Alert>
    </Snackbar>
  );
};

export default observer(SnackbarApp);
