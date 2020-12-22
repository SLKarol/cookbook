import Link from 'next/link';

import { RecipePreview } from 'types/recipe';
import styles from './preview.module.css';

const Preview: React.FC<RecipePreview> = ({
	_id,
	cover,
	createdAt,
	creator,
	description,
	name,
}) => {
	return (
		<div className={styles.preview}>
			<img src={cover} width="100%" alt={name} />
			<div className={styles.description}>
				<Link href={`/recipe/${_id}`}>
					<a className="h5">{name}</a>
				</Link>
				<div>{description}</div>
				<Link href={`/recipe/${_id}`}>
					<a className={styles.link}>Подробнее</a>
				</Link>
				<div className={styles.author}>{`${creator.name}, ${new Date(
					createdAt
				).toLocaleDateString()}`}</div>
			</div>
		</div>
	);
};

export default Preview;
