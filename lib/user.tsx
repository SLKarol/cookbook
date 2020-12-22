import { useState, useEffect } from 'react';

/**
 * Текущий пользователь авторизован?
 */
export const currentUserHasLogin = () => {
	const storage = globalThis.localStorage;
	const token = storage.getItem('token');
	const expiryDate = storage.getItem('expiryDate');
	if (!token || !expiryDate) {
		return false;
	}
	if (new Date(expiryDate) <= new Date()) {
		localStorage.removeItem('token');
		localStorage.removeItem('expiryDate');
		localStorage.removeItem('userId');
		return false;
	}
	return true;
};

export function useCheckToken(initValue = true) {
	const [isLogIn, setIsLogIn] = useState(initValue);
	useEffect(() => {
		const hasToken = currentUserHasLogin();
		setIsLogIn(hasToken);
	}, []);
	return isLogIn;
}

export function useUserId() {
	// const [userId, setUserId] = useState('');
	// useEffect(() => {
	// 	const hasToken = currentUserHasLogin();
	// 	setIsLogIn(hasToken);
	// }, []);
	// return isLogIn;
}
