import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './input.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	caption: string;
	valid?: boolean;
}

/**
 * Компонент ввода значений
 */
const Input: FC<Props> = ({
	caption,
	id,
	type = 'text',
	valid = true,
	className = '',
	...props
}) => {
	return (
		<div className={styles.block}>
			<label className={styles.label} htmlFor={id}>
				{caption}
			</label>
			<input
				className={`${styles.input} ${className} ${
					!valid && styles.inputInvalid
				}`}
				id={id}
				type={type}
				{...props}
			></input>
		</div>
	);
};

export default Input;
