import { Step } from 'types/step';

import styles from './steps.module.css';

interface Props {
	step: Step;
}

const StepComponent: React.FC<Props> = ({ step }) => {
	return (
		<div className={styles.step}>
			<img src={step.cover} alt="" className={styles.cover} />
			<div className={styles.wrap}>{step.description}</div>
		</div>
	);
};

export default StepComponent;
