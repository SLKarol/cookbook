import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from 'components/Button/Button';
import ButtonLink from 'components/ButtonLink/ButtonLink';

interface Props {
	id: string;
	creatorId: string;
}

import styles from './styles.module.css';

const RecipeAction: React.FC<Props> = ({ id, creatorId }) => {
	const [availableAction, setAvailableAction] = useState(true);
	useEffect(() => {
		const userId = window.localStorage.getItem('userId') || '';
		if (userId !== creatorId) {
			setAvailableAction(false);
		}
	}, []);

	const router = useRouter();
	const onClickBack = () => router.back();
	return (
		<ul className={styles.ul}>
			<li>
				<Button onClick={onClickBack}>Назад</Button>
			</li>
			{availableAction && (
				<>
					<li className={styles.action}>
						<ButtonLink href={`/edit/${id}`} title="Редактировать" />
					</li>
					<li className={styles.actionLast}>
						<ButtonLink href={`/delete/${id}`} title="Удалить" />
					</li>
				</>
			)}
		</ul>
	);
};

export default RecipeAction;
