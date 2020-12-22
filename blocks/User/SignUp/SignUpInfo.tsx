import { FC, ReactNode } from 'react';

import Message from 'components/Message/Message';

interface Props {
	error: ReactNode;
}

const SignUpInfo: FC<Props> = ({ error }) => {
	return (
		<div>
			<Message>
				<strong>Регистрация:</strong> Заполните все поля и не забудьте введённый
				пароль.
			</Message>
			{error && <Message type={'error'}>{error}</Message>}
		</div>
	);
};

export default SignUpInfo;
