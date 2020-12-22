import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
				<button className="button__button" onClick={onClickBack}>
					Назад
				</button>
			</li>
			{availableAction && (
				<>
					<li className={styles.action}>
						<Link href={`/edit/${id}`}>
							<a className="button__button">Редактировать</a>
						</Link>
					</li>
					<li className={styles.actionLast}>
						<Link href={`/delete/${id}`}>
							<a className="button__button">Удалить</a>
						</Link>
					</li>
				</>
			)}
		</ul>
	);
};

export default RecipeAction;
