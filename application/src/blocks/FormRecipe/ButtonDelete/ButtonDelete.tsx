import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Reference, StoreObject, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { DELETE_RECIPE } from "querys/recipe";

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
   * Удалить рецепт
   */
  const [deleteRecipe] = useMutation<{ updateRecipe: string }, { id: string }>(
    DELETE_RECIPE,
    {
      onError: onApolloError,
      onCompleted: () => {
        showBackdrop(false);
        history.push("/");
      },
      update: (cache) => {
        try {
          cache.modify({
            fields: {
              // Обновить список рецептов (recipes - удалить из них тот, который юзер удалил)
              recipes(existingRecipes, { readField }) {
                return existingRecipes.filter(
                  (commentRef: Reference | StoreObject | undefined) =>
                    id !== readField("id", commentRef)
                );
              },
            },
          });
        } catch (_) {}
      },
    }
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
