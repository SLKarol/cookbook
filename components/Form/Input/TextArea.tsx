import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './input.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	caption: string;
	valid?: boolean;
}

const TextArea: FC<Props> = ({
	caption,
	id,
	valid = true,
	className = '',
	...props
}) => {
	return (
		<div className={styles.block}>
			<label className={styles.label} htmlFor={id}>
				{caption}
			</label>
			<textarea
				className={`${styles.input} ${styles.textarea} ${className} ${
					!valid && styles.inputInvalid
				}`}
				id={id}
				{...props}
			></textarea>
		</div>
	);
};

export default TextArea;
