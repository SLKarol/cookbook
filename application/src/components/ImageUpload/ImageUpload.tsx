import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import withHocs, { PropStyles } from "./ImageUploadHoc";
import { UploadComponentProps } from "types/imageUpload";

import PleaseSelectImage from "components/PleaseSelectImage/PleaseSelectImage";

interface State {
  selectedImage: string | ArrayBuffer | null;
}

type Props = UploadComponentProps & PropStyles;

/**
 * Выбор изображения, предпросмотр загружаемого изображения
 */
class ImageUpload extends Component<Props, State> {
  /**
   * Юзер выбрал фото
   */
  onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let reader = new FileReader();
    const { id = "upload-photo", files } = e.target;
    if (files?.length) {
      const { onSelectImage } = this.props;
      let file = files[0];
      reader.onloadend = () => {
        onSelectImage && onSelectImage({ id, imageContent: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const {
      classes,
      id = "upload-photo",
      required = false,
      selectedImage,
      error = false,
    } = this.props;
    return (
      <div>
        <label htmlFor={id}>
          <input
            className={classes.inputFile}
            id={id}
            name={id}
            type="file"
            accept="image/*"
            onChange={this.onImageChange}
          />
          <Button
            color={required ? "primary" : "default"}
            variant="contained"
            component="span"
          >
            Загрузить фото
          </Button>
        </label>
        <Card className={classes.card}>
          <CardActionArea>
            {selectedImage ? (
              <CardMedia
                component="img"
                alt=""
                height="140"
                image={selectedImage}
                title=""
              />
            ) : (
              <PleaseSelectImage required={required} error={error} />
            )}
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withHocs(ImageUpload);
