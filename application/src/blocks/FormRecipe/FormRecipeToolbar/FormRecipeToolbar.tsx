import React from "react";
import { useParams } from "react-router-dom";

import withHocs, { PropsStyles } from "./FormRecipeToolbarHoc";

import ButtonGoToLink from "components/ButtonGoToLink/ButtonGoToLink";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

/**
 * Форма создания-редактирования рецепта
 */
const FormRecipeToolbar: React.FC<PropsStyles> = ({ classes }) => {
  const { id } = useParams<{ id?: string }>();
  return (
    <div className={classes.buttons}>
      <ButtonGoToLink url="/" className={classes.button}>
        Отмена
      </ButtonGoToLink>
      {id ? <ButtonDelete /> : null}
      <ButtonSave />
    </div>
  );
};

export default withHocs(FormRecipeToolbar);
