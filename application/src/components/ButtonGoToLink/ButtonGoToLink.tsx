import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

type Props = ButtonProps & {
  url?: string;
};

/**
 * Кнопка, по нажатию на которую следует отправиться по ссылке
 */
const ButtonGoToLink: React.FC<Props> = ({ url = "/", children, ...props }) => {
  const history = useHistory();
  const onClick = () => history.push(url);
  if ("onClick" in props) delete props.onClick;

  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonGoToLink;
