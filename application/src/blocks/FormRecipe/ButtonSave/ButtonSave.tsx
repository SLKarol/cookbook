import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

import { ADD_RECIPE, UPDATE_RECIPE, GET_RECIPE } from "querys/recipe";
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
    awaitRefetchQueries: true,
    onError: onApolloError,
    onCompleted: () => {
      showBackdrop(false);
    },
  };

  /**
   * Добавить рецепт
   */
  const [addRecipe] = useMutation<
    { insertOneRecipe: { id: string } },
    SaveRecipe
  >(ADD_RECIPE, {
    ...settingsMutation,
    update: (cache, { data }) => {
      try {
        cache.modify({
          fields: {
            // Добавить в список рецептов созданный рецепт
            recipes(existingRecipes) {
              const {
                steps,
                cookingTime,
                id,
                ingredients,
                ...recipe
              } = valuesToSave;
              // Создать элемент кэша
              const newRecipeRef = cache.writeFragment({
                data: {
                  ...recipe,
                  id: data?.insertOneRecipe.id,
                  __typename: "Recipe",
                },
                fragment: gql`
                  fragment NewRecipe on Recipe {
                    id
                    name
                    description
                    cover
                  }
                `,
              });
              // Добавить созданную запись в кэш.
              // Положить её наверх списка.
              return [newRecipeRef].concat(existingRecipes);
            },
          },
        });
      } catch (e) {
        console.log("e :>> ", e);
      }
    },
  });

  /**
   * Редактировать рецепт
   */
  const [editRecipe] = useMutation<
    { updateRecipe: { steps: { id: string }[] } },
    SaveRecipe
  >(UPDATE_RECIPE, {
    ...settingsMutation,
    refetchQueries: [{ query: GET_RECIPE, variables: { id: valuesToSave.id } }],
  });

  /**
   * Сохранить рецепт
   */
  const onClickSave: TOnClick = (e) => {
    e.preventDefault();
    onSave();
    if (!isValidForm) return;
    showBackdrop(true);
    // Одна процедура для создания ...
    if (!id) {
      addRecipe({
        variables: valuesToSave,
      }).then(() => {
        history.push("/");
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
