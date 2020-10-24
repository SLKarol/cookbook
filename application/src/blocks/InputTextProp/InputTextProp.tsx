import React from "react";
import { observer } from "mobx-react-lite";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

import { useStore } from "stores/recipe";
import { OnlyStringFields } from "types/recipe";

type Props = TextFieldProps & {
  name: Exclude<OnlyStringFields, "id">;
};

/**
 * Ввод текстовых значений.
 * В свойствах инпута обязательно задаётся name - это имя поля,
 * которое собираемся изменить
 */
const InputTextProp: React.FC<Props> = ({ name, ...props }) => {
  const { [name]: value, onChangeText, userPressSave } = useStore();

  return (
    <TextField
      {...props}
      name={name}
      value={value}
      onChange={onChangeText}
      error={userPressSave && !value}
    />
  );
};

export default observer(InputTextProp);
