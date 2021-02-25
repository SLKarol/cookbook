import { observer } from 'mobx-react-lite';

import { useStore } from 'store';

import styles from './step.module.css';

import Button from 'components/Button/Button';

interface Props {
	canDeleteIt: boolean;
	idStep: string;
}

const StepTools: React.FC<Props> = ({ canDeleteIt, idStep }) => {
	const {
		recipe: { onAddStep, onDeleteStep, onDeletePhoto },
	} = useStore();
	return (
		<div>
			<Button
				aria-label="Добавить шаг"
				title="Добавить шаг"
				type="button"
				className={styles.button}
				onClick={onAddStep}
			>
				Добавить шаг
			</Button>
			{canDeleteIt && (
				<Button
					aria-label="Удалить шаг"
					title="Удалить шаг"
					data-step-id={idStep}
					type="button"
					className={styles.button}
					onClick={onDeleteStep}
				>
					Удалить шаг
				</Button>
			)}
			<Button
				data-step-id={idStep}
				type="button"
				className={styles.button}
				onClick={onDeletePhoto}
			>
				Удалить фото
			</Button>
		</div>
	);
};

export default observer(StepTools);
