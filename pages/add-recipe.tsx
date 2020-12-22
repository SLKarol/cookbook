import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { ErrorApi } from 'types';

import { useStore } from 'store';
import { fetchGraphQl } from 'lib/apolloClient';

import Layout from 'components/Layout/Layout';
import FormRecipe from 'blocks/FormRecipe/FormRecipe';
import ErrorFetchGraphQL from 'components/ErrorFetchGraphQL/ErrorFetchGraphQL';

const mutationQuery = `
mutation insertOneRecipe(
	$name: String!
	$description: String!
	$cookingTime: String!
	$cover: String!
	$ingredients: String!
	$steps: [StepInputData!]!
) {
	createRecipe(
		recipeInput: {
			name: $name
			description: $description
			cover: $cover
			cookingTime: $cookingTime
			ingredients: $ingredients
			steps: $steps
		}
	) {
		_id
	}
}
`;

const AddRecipe: React.FC = () => {
	// Взять необходимый реквизит из стора
	const {
		recipe: { createRecipe, valuesToSave },
	} = useStore();
	// Очистить данные перед вводом
	useEffect(() => {
		createRecipe();
	}, []);
	// Признак работы формы
	const [working, setWorking] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorApi[] | null>(null);
	const router = useRouter();

	const onSubmit = async () => {
		setWorking(true);
		const graphqlQuery = {
			query: mutationQuery,
			variables: valuesToSave,
		};
		const resData = await fetchGraphQl(JSON.stringify(graphqlQuery));
		const { errors } = resData;
		setWorking(false);
		if (!errors) {
			router.push('/');
		}
		setErrors(errors);
	};

	return (
		<Layout>
			<FormRecipe operation="add" onSubmit={onSubmit} loading={working} />
			{errors && <ErrorFetchGraphQL errors={errors} />}
		</Layout>
	);
};
export default observer(AddRecipe);
