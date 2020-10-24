import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { ADD_RECIPE, UPDATE_RECIPE, GET_RECIPES_REVIEW } from "querys/recipe";
import { SaveRecipe } from "types/recipe";
import { TOnClick } from "types/types";

import withHocs, { Props } from "./ButtonSaveHoc";
import { useStore } from "stores/recipe";
import { useUiStore } from "stores/ui";

/**
 * Кнопка "Сохранить/Создать рецепт"
 * Здесь же функционал обработки нажатия
 */
const ButtonSave: React.FC<Props> = ({ classes }) => {
  let history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const { isValidForm, onSave, valuesToSave } = useStore();
  const { onApolloError, showBackdrop } = useUiStore();

  /**
   * Настройки мутаций
   */
  const settingsMutation = {
    refetchQueries: [{ query: GET_RECIPES_REVIEW }],
    awaitRefetchQueries: true,
    ignoreResults: true,
    onError: onApolloError,
    onCompleted: () => {
      showBackdrop(false);
      history.push("/");
    },
  };

  /**
   * Добавить рецепт
   */
  const [addRecipe] = useMutation<{ insertOneRecipe: string }, SaveRecipe>(
    ADD_RECIPE,
    settingsMutation
  );

  /**
   * Редактировать рецепт
   */
  const [editRecipe] = useMutation<{ updateRecipe: string }, SaveRecipe>(
    UPDATE_RECIPE,
    settingsMutation
  );

  const onClickSave: TOnClick = (e) => {
    e.preventDefault();
    onSave();
    if (!isValidForm) return;
    showBackdrop(true);
    // Одна процедура для создания ...
    if (!id) {
      addRecipe({
        variables: valuesToSave,
      });
    } else {
      // ... Другая процедура для редактирования
      editRecipe({
        variables: valuesToSave,
      });
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      type="submit"
      onClick={onClickSave}
      startIcon={<SaveIcon />}
    >
      Сохранить
    </Button>
  );
};

export default withHocs(ButtonSave);
