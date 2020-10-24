import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface Props {
  required: Boolean;
  error: Boolean;
}

/**
 * Надпись о том, что необходимо выбрать фото
 */
const PleaseSelectImage: React.FC<Props> = ({
  required = false,
  error = false,
}) => {
  return (
    required && (
      <CardContent>
        <Typography
          variant="body2"
          color={error ? "error" : "textSecondary"}
          component="p"
        >
          Пожалуйста, выберете изображение
        </Typography>
      </CardContent>
    )
  );
};

export default PleaseSelectImage;
