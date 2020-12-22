import { FC } from 'react';

import Message from 'components/Message/Message';

interface Props {
	required: boolean;
	error: boolean;
}

const PleaseSelectImage: FC<Props> = ({ error, required }) => {
	if (!required) return null;
	return (
		<Message type={error ? 'error' : 'info'}>
			{required
				? 'Пожалуйста, выберете изображение'
				: 'Вы можете выбрать изображение'}
		</Message>
	);
};

export default PleaseSelectImage;
