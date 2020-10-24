import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/recipe";
import StepEdit from "blocks/StepEdit/StepEdit";

/**
 * Список шагов приготовления рецепта
 * Для их редактирования
 */
const ListStepsEdit: React.FC = () => {
  const { stepsIds } = useStore();

  return (
    <>
      {stepsIds.map((step) => (
        <StepEdit key={step} id={step || ""} />
      ))}
    </>
  );
};

export default observer(ListStepsEdit);
