import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: FC = () => {
	const { push } = useRouter();
	useEffect(() => {
		push('/recipes/1');
	});
	return null;
};
export default Index;
