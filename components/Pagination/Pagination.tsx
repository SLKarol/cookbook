import styles from './pagination.module.css';

import Button from 'components/Button/Button';
import ButtonLink from 'components/ButtonLink/ButtonLink';

type Props = {
	recordsPerPage: number;
	totalRecords: number;
	current: number;
	busy: boolean;
};
const Pagination: React.FC<Props> = ({
	recordsPerPage,
	totalRecords,
	current,
	busy,
}) => {
	const pageNumbers: number[] = [];

	for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
		pageNumbers.push(i);
	}

	if (pageNumbers.length === 1) {
		return null;
	}

	return (
		<nav>
			<ul className={styles.ul}>
				{pageNumbers.map((number) => (
					<li key={number} className={styles.li}>
						{busy || current === number ? (
							<Button disabled={true}>{number}</Button>
						) : (
							<ButtonLink href={`/recipes/${number}`} title={'' + number} />
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
