import Link from 'next/link';

import styles from './linkDetailed.module.css';

type Props = {
	id: string;
};

const LinkDetailed: React.FC<Props> = ({ id }) => (
	<div className={styles.container}>
		<Link href={`/recipe/${id}`}>
			<a className={styles.link}>
				<span className="span">Подробнее</span>
			</a>
		</Link>
	</div>
);

export default LinkDetailed;
