import { FC, DetailedHTMLProps, FormHTMLAttributes } from 'react';

import styles from './form.module.css';

interface Props
	extends DetailedHTMLProps<
		FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> {
	busy?: boolean;
}

const Form: FC<Props> = ({ busy = false, children, ...props }) => {
	return (
		<form {...props}>
			{children}
			<div className={styles.footer}>
				<button type="submit" className={styles.button} disabled={busy}>
					Отправить
				</button>
				<button type="reset" className={styles.button} disabled={busy}>
					Отмена
				</button>
			</div>
		</form>
	);
};

export default Form;
