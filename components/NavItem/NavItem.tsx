import Link from 'next/link';

import styles from './navitem.module.css';

interface Props {
	link: string;
	text: string;
	current: boolean;
}

const NavItem: React.FC<Props> = ({ link, current, text }) => (
	<li className={styles.container}>
		<Link href={link}>
			<a className={!current ? styles.item : styles.itemActive}>{text}</a>
		</Link>
	</li>
);

export default NavItem;
