import { FC } from 'react';
import { ErrorApi } from 'types';

import Message from 'components/Message/Message';
import DataErrors from './DataErrors';

interface Props {
	errors: ErrorApi[];
}

/**
 * Вывести ошибки фетча GraphQL
 */
const ErrorFetchGraphQL: FC<Props> = ({ errors }) => {
	const errorView = errors.map((e) => (
		<Message type="error">
			{e.message}
			<DataErrors data={e.data} />
		</Message>
	));
	return <div>{errorView}</div>;
};

export default ErrorFetchGraphQL;
