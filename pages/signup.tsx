import { ReactNode, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { ErrorApi } from 'types';
import { useStore } from 'store';
import { fetchGraphQL } from 'lib/apolloClient';

import SignUp from 'blocks/User/SignUp/SignUp';

const signUpMutation = `mutation CreateNewUser($email: String!, $name: String!, $password: String!) {
	createUser(userInput: {email: $email, name: $name, password: $password}) {
		_id
	}
}`;
const PageSignUp: React.FC = () => {
	// Получить из стора реквизиты для регистрации
	const {
		user: {
			formIsValid: { formIsValid },
			clearInput,
			email,
			name,
			password,
		},
	} = useStore();
	useEffect(() => {
		clearInput();
	}, []);
	const [errorMsg, setErrorMsg] = useState<ReactNode>('');
	const [formBusy, setFormBusy] = useState(false);
	const router = useRouter();

	const onSubmit = async () => {
		if (!formIsValid) return;

		setFormBusy(true);
		const graphqlQuery = {
			query: signUpMutation,
			variables: {
				email,
				name,
				password,
			},
		};
		try {
			// Регистрация пользователя
			const resData = await fetchGraphQL(JSON.stringify(graphqlQuery));
			if (resData.errors && resData.errors[0].status === 422) {
				setErrorMsg('Валидация не удалась.');
			}
			if (resData.errors) {
				(resData.errors as ErrorApi[]).reduce((summary, error) => {
					summary += error.message + ' ';
					return summary;
				}, '');
				return setErrorMsg(resData.errors[0].message);
			}
			clearInput();
			router.push('/login');
		} catch (e) {
			console.error(e);
		} finally {
			setFormBusy(false);
		}
	};

	return <SignUp error={errorMsg} formBusy={formBusy} onSubmit={onSubmit} />;
};

export default observer(PageSignUp);
