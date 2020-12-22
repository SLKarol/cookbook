import { ReactNode, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { ErrorApi } from 'types';
import { useStore } from 'store';

import Login from 'blocks/User/Login/Login';
import { fetchGraphQl } from 'lib/apolloClient';

const loginQuery = `query UserLogin($email: String!, $password: String!) {
	login(email: $email, password: $password) {
		token
		userId
	}
}`;

const PageLogin: React.FC = () => {
	// Получить из стора нужные реквизиты для логина
	const {
		user: { clearInput, email, password },
	} = useStore();
	useEffect(() => {
		clearInput();
	}, []);
	const [errorMsg, setErrorMsg] = useState<ReactNode>('');
	const [formBusy, setFormBusy] = useState(false);
	const router = useRouter();

	const onSubmit = async () => {
		if (!email || !password) return;
		setFormBusy(true);

		const graphqlQuery = {
			query: loginQuery,
			variables: {
				email,
				password,
			},
		};

		try {
			// Логин пользователя
			const resData = await fetchGraphQl(JSON.stringify(graphqlQuery));
			setFormBusy(false);
			if (resData.errors && resData.errors[0].status === 422) {
				setErrorMsg('Валидация не удалась.');
			}
			if (resData.errors) {
				setErrorMsg(
					(resData.errors as ErrorApi[]).reduce((summary, error) => {
						summary += error.message + ' ';
						return summary;
					}, '')
				);
			}
			// Сохранить токен
			localStorage.setItem('token', resData.data.login.token);
			localStorage.setItem('userId', resData.data.login.userId);
			const remainingMilliseconds = 60 * 60 * 1000;
			const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
			localStorage.setItem('expiryDate', expiryDate.toISOString());

			router.push('/');
		} catch (e) {
			console.error(e);
			return e;
		}
	};

	return <Login error={errorMsg} formBusy={formBusy} onSubmit={onSubmit} />;
};

export default observer(PageLogin);
