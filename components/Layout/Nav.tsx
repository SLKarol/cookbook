import { Component } from 'react';

import NavItem from 'components/NavItem/NavItem';

type NavProps = {
	pathname: string;
};

type NavState = {
	isAuth: boolean;
};
type MenuItem = {
	link: string;
	text: string;
};

class Nav extends Component<NavProps, NavState> {
	state = {
		isAuth: false,
	};
	componentDidMount() {
		const token = localStorage.getItem('token');
		const expiryDate = localStorage.getItem('expiryDate');

		if (!token || !expiryDate) {
			return;
		}
		if (new Date(expiryDate) <= new Date()) {
			this.logoutHandler();
			return;
		}

		const remainingMilliseconds =
			new Date(expiryDate).getTime() - new Date().getTime();
		this.setState({ isAuth: true });
		this.setAutoLogout(remainingMilliseconds);
	}

	logoutHandler = () => {
		this.setState({ isAuth: false });
		localStorage.removeItem('token');
		localStorage.removeItem('expiryDate');
		localStorage.removeItem('userId');
	};

	setAutoLogout = (milliseconds: number) => {
		setTimeout(() => {
			this.logoutHandler();
		}, milliseconds);
	};

	configLinks: MenuItem[] = [
		{
			link: '/recipes/1',
			text: 'Рецепты',
		},
		{
			link: '/signup',
			text: 'Регистрация',
		},
		{
			link: '/login',
			text: 'Вход',
		},
		{
			link: '/add-recipe',
			text: 'Добавить',
		},
		{
			link: '/logout',
			text: 'Выход',
		},
	];

	/**
	 * В зависимости от наличия токена сформировать пункты меню
	 */
	getMenuConfig = () => {
		const { isAuth } = this.state;
		let excludeMenu: string[] = [];
		if (isAuth) {
			excludeMenu.push('/signup');
			excludeMenu.push('/login');
		} else {
			excludeMenu.push('/add-recipe');
			excludeMenu.push('/logout');
		}
		return this.configLinks.filter((m) => excludeMenu.indexOf(m.link) === -1);
	};
	render() {
		const menuConfig = this.getMenuConfig();
		const { pathname } = this.props;
		return (
			<nav className="main-nav">
				<ul className="main-nav__list">
					{menuConfig.map((menu) => (
						<NavItem
							key={menu.link}
							link={menu.link}
							current={menu.link === pathname}
							text={menu.text}
						/>
					))}
				</ul>
			</nav>
		);
	}
}

export default Nav;
