import { FC } from 'react';

interface Props {
	data?: { message: string }[];
}

/**
 * Перечисление ошибок graphQL
 */
const DataErrors: FC<Props> = ({ data }) => {
	if (!data) return null;
	return (
		<ul>
			{data.map((m) => (
				<li key={m.message}>{m.message}</li>
			))}
		</ul>
	);
};

export default DataErrors;
