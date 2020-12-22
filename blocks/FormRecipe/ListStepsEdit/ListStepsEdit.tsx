import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store';
import StepEdit from '../StepEdit/StepEdit';

/**
 * Список шагов приготовления рецепта
 * Для их редактирования
 */
const ListStepsEdit: React.FC = () => {
	const {
		recipe: { recipeSteps },
	} = useStore();
	return (
		<>
			{recipeSteps.map((step) => (
				<StepEdit key={step._id} step={step}></StepEdit>
			))}
		</>
	);
};

export default observer(ListStepsEdit);
