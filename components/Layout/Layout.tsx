import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from './Nav';

type Props = {
	children?: ReactNode;
};

export default function Layout({ children }: Props) {
	const { pathname } = useRouter();
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Кулинарная книга: демо-проект" />
				<meta
					name="viewport"
					content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"
				/>
				<title>Кулинарная книга</title>
			</Head>
			<div className="wrapper">
				<header className="main-head">
					<div className="main-head__logo">
						<img
							src="/images/chef.svg"
							alt=""
							height="200px"
							className="main-head__svg"
						/>
						<h1 className="main-head__word main-head__word--first text-shadow">
							Кулинарная
						</h1>
						<h1 className="main-head__word text-shadow">книга</h1>
					</div>
					<Nav pathname={pathname} />
				</header>
				<div className="content">{children}</div>
				<footer className="main-footer">С наилучшими пожеланиями!</footer>
			</div>
		</>
	);
}
