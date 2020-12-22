import { Fragment } from 'react';
import { Step } from 'types/step';
import styles from './steps.module.css';

import StepComponent from './StepComponent';

interface Props {
	steps: Step[];
}

const StepsList: React.FC<Props> = ({ steps }) => {
	return (
		<>
			<h4 className="h4">Шаги приготовления</h4>
			{steps.map((s, idx) => (
				<Fragment key={s._id}>
					<h5 className="h5">{`Шаг ${idx + 1}`}</h5>
					<StepComponent key={s._id} step={s}></StepComponent>
					<hr className={styles.hr} />
				</Fragment>
			))}
		</>
	);
};

export default StepsList;
