import Link from 'next/link';

import { RecipePreview } from 'types/recipe';
import styles from './preview.module.css';

import LinkDetailed from './LinkDetailed';

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
					<a className={`h5 ${styles.name}`}>{name}</a>
				</Link>
				<div>{description}</div>
				<LinkDetailed id={_id} />
				<div className={styles.author}>{`${creator.name}, ${new Date(
					createdAt
				).toLocaleDateString()}`}</div>
			</div>
		</div>
	);
};

export default Preview;
