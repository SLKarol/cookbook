import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { useStore } from "stores/recipe";
import withHocs, { PropsComponent } from "./StepEditHoc";

import ImageUpload from "components/ImageUpload/ImageUpload";

/**
 * Блок создания-редактирования шага рецепта
 */
const StepEdit: React.FC<PropsComponent> = ({ classes, id = "" }) => {
  const {
    onAddStep,
    onChangeStep,
    userPressSave,
    onSelectImage,
    onDeleteStep,
    onDeletePhoto,
    getSteps,
  } = useStore();

  const { nameStep, description, cover, canDeleteIt } = getSteps[
    getSteps.findIndex((w) => w.id === id)
  ];

  return (
    <Card>
      <CardContent>
        {nameStep ? (
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {nameStep}
          </Typography>
        ) : null}
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={5}
          className={classes.description}
          name="description"
          value={description}
          onChange={onChangeStep}
          inputProps={{ "data-step-id": id }}
          error={userPressSave && !description}
        />
        <ImageUpload
          id={id}
          required={false}
          onSelectImage={onSelectImage}
          selectedImage={cover}
        />
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          aria-label="Добавить шаг"
          title="Добавить шаг"
          onClick={onAddStep}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        {canDeleteIt && (
          <IconButton
            color="secondary"
            aria-label="Удалить шаг"
            title="Удалить шаг"
            data-step-id={id}
            onClick={onDeleteStep}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <Button
          variant="contained"
          color="default"
          startIcon={<DeleteIcon />}
          name={id}
          data-step-id={id}
          onClick={onDeletePhoto}
        >
          Удалить фото
        </Button>
      </CardActions>
    </Card>
  );
};

export default withHocs(StepEdit);
