import { FC, ComponentPropsWithoutRef } from 'react';

import styles from './button.module.css';

interface Props extends ComponentPropsWithoutRef<'button'> {
	variant?: 'default';
}

const Button: FC<Props> = ({
	variant = 'default',
	className = '',
	children,
	...props
}) => (
	<button className={`${styles[variant]} ${className}`} {...props}>
		{children}
	</button>
);

export default Button;
