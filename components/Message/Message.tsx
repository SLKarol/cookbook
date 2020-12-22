import { ReactNode, FC } from 'react';
import Image from 'next/image';

import styles from './message.module.css';

interface Props {
	type?: 'error' | 'success' | 'info' | 'warning';
	children?: ReactNode;
}

const Message: FC<Props> = ({ type = 'warning', children }) => {
	const imageUrl = `/images/icons/${type}.png`;
	const altUrl =
		type === 'error'
			? 'Ошибка'
			: type === 'info'
			? 'Информация'
			: type === 'success'
			? 'Выполнено'
			: 'Внимание';
	return (
		<div className={`${styles.message} ${styles[type]}`}>
			<div className={styles.image}>
				<Image
					alt={altUrl}
					src={imageUrl}
					width={16}
					height={16}
					layout="fixed"
				/>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Message;
