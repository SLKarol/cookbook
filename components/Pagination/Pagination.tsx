import Link from 'next/link';
import styles from './pagination.module.css';

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
						<Link href={`/recipes/${number}`}>
							<button
								className="button__button"
								disabled={busy || current === number}
							>
								{number}
							</button>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
