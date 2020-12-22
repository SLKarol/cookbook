import { FetchGraphQL } from 'types';

export function getErrorMessage(error: any) {
	console.log('error :>> ', error);
	if (error.graphQLErrors) {
		for (const graphQLError of error.graphQLErrors) {
			if (
				graphQLError.extensions &&
				graphQLError.extensions.code === 'BAD_USER_INPUT'
			) {
				return graphQLError.message;
			}
		}
	}
	return error.message;
}

/**
 * graphQL запрос
 */
export const fetchGraphQl: FetchGraphQL = async (body) => {
	const PORT = parseInt(process.env.PORT || '3000', 10);
	const HOSTNAME = process.env.HOSTNAME || 'localhost';
	//--- Получить localStorage
	const localStorage = globalThis.localStorage;
	//--- Если есть токен, значит добавить его в заголовок авторизации
	const token = localStorage?.getItem('token');
	const authHeader = new Headers();
	if (token !== null) authHeader.append('Authorization', `Bearer ${token}`);
	authHeader.append('Content-Type', 'application/json');

	const response = await fetch(`http://${HOSTNAME}:${PORT}/graphql`, {
		method: 'POST',
		headers: authHeader,
		body,
	});
	const redData = await response.json();
	return redData;
};

export const fetchGraphQL: FetchGraphQL = async (body) => {
	//--- Получить localStorage
	const localStorage = globalThis.localStorage;
	//--- Если есть токен, значит добавить его в заголовок авторизации
	const token = localStorage?.getItem('token');
	const authHeader = new Headers();
	if (token !== null) authHeader.append('Authorization', `Bearer ${token}`);
	authHeader.append('Content-Type', 'application/json');

	const response = await fetch(`/graphql`, {
		method: 'POST',
		headers: authHeader,
		body,
	});
	const redData = await response.json();
	return redData;
};
