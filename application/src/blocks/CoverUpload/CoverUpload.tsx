import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/recipe";
import { UploadComponentProps } from "types/imageUpload";

import Upload from "components/ImageUpload/ImageUpload";

const CoverUpload: React.FC<UploadComponentProps> = ({
  id,
  required = false,
}) => {
  const { userPressSave, onSelectImage, cover } = useStore();
  return (
    <Upload
      id={id}
      required={required}
      onSelectImage={onSelectImage}
      selectedImage={cover}
      error={userPressSave && !cover}
    />
  );
};

export default observer(CoverUpload);
