import { useRouter } from 'next/router';

const LogOut: React.FC = () => {
	const router = useRouter();
	localStorage.removeItem('token');
	localStorage.removeItem('expiryDate');
	localStorage.removeItem('userId');
	router.push('/');
	return <div />;
};

export default LogOut;
