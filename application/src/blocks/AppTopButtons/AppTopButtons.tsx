import React from "react";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";

import withHocs, { PropStyles } from "./AppTopButtonsHoc";

import ButtonAdd from "./ButtonAdd";

/**
 * Кнопки в главном окне
 */
const AppTopButtons: React.FC<PropStyles> = ({ classes }) => {
  const { pathname } = useLocation();
  return (
    <div className={classes.buttons}>
      <Grid container spacing={2} justify="center">
        {pathname === "/" && <ButtonAdd />}
      </Grid>
    </div>
  );
};

export default withHocs(AppTopButtons);
