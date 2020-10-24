import React from "react";
import Grid from "@material-ui/core/Grid";

import ButtonGoToLink from "components/ButtonGoToLink/ButtonGoToLink";

const ButtonAdd: React.FC = () => (
  <Grid item>
    <ButtonGoToLink url="/add" variant="contained" color="primary">
      Добавить рецепт
    </ButtonGoToLink>
  </Grid>
);

export default ButtonAdd;
