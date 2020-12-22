import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogOut: React.FC = () => {
	const router = useRouter();
	useEffect(() => {
		localStorage.removeItem('token');
		localStorage.removeItem('expiryDate');
		localStorage.removeItem('userId');
		router.push('/');
	});
	return <div />;
};

export default LogOut;
