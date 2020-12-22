import Link from 'next/link';

interface Props {
	link: string;
	text: string;
	current: boolean;
}

const NavItem: React.FC<Props> = ({ link, current, text }) => {
	return (
		<li className="main-nav__list-item">
			<Link href={link}>
				<a
					className={`main-nav__link ${
						current ? 'main-nav__link--active' : ''
					}`}
				>
					{text}
				</a>
			</Link>
		</li>
	);
};

export default NavItem;
