import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { DELETE_RECIPE, GET_RECIPES_REVIEW } from "querys/recipe";

import { TOnClick } from "types/types";
import withHocs, { Props } from "../ButtonSave/ButtonSaveHoc";
import { useUiStore } from "stores/ui";

/**
 * Кнопка "Удалить рецепт"
 * Функционал в этом же файле
 */
const ButtonDelete: React.FC<Props> = ({ classes }) => {
  let history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const { onApolloError, showBackdrop } = useUiStore();

  /**
   * Настройка мутации
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
   * Удалить рецепт
   */
  const [deleteRecipe] = useMutation<{ updateRecipe: string }, { id: string }>(
    DELETE_RECIPE,
    settingsMutation
  );

  const onClickDelete: TOnClick = (e) => {
    e.preventDefault();
    showBackdrop(true);
    deleteRecipe({
      variables: { id: id || "" },
    });
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      type="submit"
      startIcon={<DeleteIcon />}
      onClick={onClickDelete}
    >
      Удалить
    </Button>
  );
};

export default withHocs(ButtonDelete);
