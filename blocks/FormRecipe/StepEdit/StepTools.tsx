import { observer } from 'mobx-react-lite';

import { useStore } from 'store';

import styles from './step.module.css';

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
			<button
				aria-label="Добавить шаг"
				title="Добавить шаг"
				type="button"
				className={`button__button ${styles.button}`}
				onClick={onAddStep}
			>
				Добавить шаг
			</button>
			{canDeleteIt && (
				<button
					aria-label="Удалить шаг"
					title="Удалить шаг"
					data-step-id={idStep}
					type="button"
					className={`button__button ${styles.button}`}
					onClick={onDeleteStep}
				>
					Удалить шаг
				</button>
			)}
			<button
				data-step-id={idStep}
				type="button"
				className={`button__button ${styles.button}`}
				onClick={onDeletePhoto}
			>
				Удалить фото
			</button>
		</div>
	);
};

export default observer(StepTools);
