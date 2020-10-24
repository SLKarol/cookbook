import React from "react";
import Typography from "@material-ui/core/Typography";

import withHocs, { PropsStyles } from "./FormRecipeHoc";

import FormRecipeToolbar from "./FormRecipeToolbar/FormRecipeToolbar";
import InputTextProp from "blocks/InputTextProp/InputTextProp";
import CoverUpload from "blocks/CoverUpload/CoverUpload";
import ListStepsEdit from "./ListStepsEdit/ListStepsEdit";

/**
 * Форма создания-редактирования рецепта
 */
const FormRecipe: React.FC<PropsStyles> = ({ classes }) => {
  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <InputTextProp label="Название рецепта" fullWidth name="name" />
      <InputTextProp
        label="Краткое описание"
        fullWidth
        multiline
        rows={2}
        name="description"
      />
      <InputTextProp label="Время готовки" name="cookingTime" />
      <CoverUpload id="recipe-photo" required={true} />
      <InputTextProp
        label="Ингридиенты"
        fullWidth
        multiline
        rows={4}
        name="ingredients"
      />
      <Typography variant="h5" color="textPrimary" paragraph>
        Шаги приготовления
      </Typography>
      <ListStepsEdit />
      <FormRecipeToolbar />
    </form>
  );
};

export default withHocs(FormRecipe);
