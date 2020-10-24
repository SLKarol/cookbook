import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import withHocs, { PropStyles } from "./ProgressHoc";

const Progress: React.FC<PropStyles> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default withHocs(Progress);
