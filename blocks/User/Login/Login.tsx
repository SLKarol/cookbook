import { FC, FormEvent, ReactNode, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { useStore } from 'store';
import { useCheckToken } from 'lib/user';

import Layout from 'components/Layout/Layout';
import Form from 'components/Form/Form';
import Input from 'components/Form/Input/Input';
import LoginInfo from './LoginInfo';

import styles from 'styles/grid.module.css';

type Props = {
	error: ReactNode;
	onSubmit: () => Promise<void>;
	formBusy: boolean;
};

const Login: FC<Props> = ({ error, onSubmit, formBusy }) => {
	const router = useRouter();
	const hasToken = useCheckToken(false);
	if (hasToken) router.push('/');

	// Получить из стора нужные реквизиты для логина
	const {
		user: {
			clearInput,
			email,
			password,
			onChange,
			formIsValid: { fieldValid },
		},
	} = useStore();
	useEffect(() => {
		clearInput();
	}, []);

	const [pressedSubmit, setPressedSubmit] = useState(false);

	const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPressedSubmit(true);
		onSubmit();
	};

	const onReset = () => {
		clearInput();
		router.push('/');
	};

	return (
		<Layout>
			<div className={styles.grid}>
				<LoginInfo error={error} />
				<div>
					<h2 className="h2">Вход</h2>
					<Form onSubmit={handlerSubmit} onReset={onReset} busy={formBusy}>
						<Input
							caption="Почта"
							id="email"
							type="email"
							onChange={onChange}
							value={email}
							valid={!pressedSubmit ? true : fieldValid.email}
						/>
						<Input
							caption="Пароль"
							id="password"
							type="password"
							onChange={onChange}
							value={password}
							valid={!pressedSubmit ? true : fieldValid.password}
						/>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default observer(Login);
