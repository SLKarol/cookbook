import React from "react";

type Props = {
  string: string;
};

/**
 * Преобразование \r и т.п. в текст с <br/>
 */
const EscapedNewLineToLineBreakTag: React.FC<Props> = ({ string }) => (
  <>
    {string.split(/\r\n|\n|\r/gm).map((item, index) => {
      return index === 0 ? item : [<br key={item} />, item];
    })}
  </>
);

export default EscapedNewLineToLineBreakTag;
