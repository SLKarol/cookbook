import Layout from 'components/Layout/Layout';
import Message from 'components/Message/Message';

const Error404: React.FC = () => {
	return (
		<Layout>
			<Message type="error">Страница не найдена</Message>
		</Layout>
	);
};
export default Error404;
