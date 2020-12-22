import stylesLogin from './login.module.css';
import Message from 'components/Message/Message';

interface Props {
	error: React.ReactNode;
}

const LoginInfo: React.FC<Props> = ({ error }) => {
	return (
		<div className={stylesLogin.message}>
			<Message type="info">
				Авторизация позволит Вам записать здесь свой рецепт.
			</Message>
			{error && <Message type={'error'}>{error}</Message>}
		</div>
	);
};

export default LoginInfo;
