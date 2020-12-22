import { FC, FormEvent, ReactNode, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { useStore } from 'store';
import { useCheckToken } from 'lib/user';

import Layout from 'components/Layout/Layout';
import Form from 'components/Form/Form';
import Input from 'components/Form/Input/Input';
import SignUpInfo from './SignUpInfo';

import styles from '../../form.module.css';
import stylesGrid from 'styles/grid.module.css';

type Props = {
	error: ReactNode;
	onSubmit: () => Promise<void>;
	formBusy: boolean;
};

const SignUp: FC<Props> = ({ error, onSubmit, formBusy }) => {
	const hasToken = useCheckToken(false);
	const router = useRouter();

	if (hasToken) router.push('/');

	const [pressedSubmit, setPressedSubmit] = useState(false);

	// Получить из стора реквизиты для регистрации
	const {
		user: {
			formIsValid: { fieldValid },
			clearInput,
			email,
			name,
			password,
			onChange,
		},
	} = useStore();
	useEffect(() => {
		clearInput();
	}, []);

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
			<div className={stylesGrid.grid}>
				<SignUpInfo error={error} />
				<div>
					<h2 className="h2">Регистрация</h2>
					<Form
						onSubmit={handlerSubmit}
						busy={formBusy}
						onReset={onReset}
						className={styles.form}
					>
						<Input
							caption="Почта"
							id="email"
							type="email"
							onChange={onChange}
							value={email}
							valid={!pressedSubmit ? true : fieldValid.email}
						/>
						<Input
							caption="Имя"
							id="name"
							onChange={onChange}
							value={name}
							valid={!pressedSubmit ? true : fieldValid.name}
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

export default observer(SignUp);
