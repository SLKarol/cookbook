import Link from 'next/link';

interface Props {
	href: string;
	title: string;
	variant?: 'default';
}

import styles from './styles.module.css';

const ButtonLink: React.FC<Props> = ({ href, title, variant = 'default' }) => {
	return (
		<Link href={href}>
			<a className={styles[variant]}>{title}</a>
		</Link>
	);
};

export default ButtonLink;
