import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { ErrorApi } from 'types';
import { fetchGraphQL } from 'lib/apolloClient';
import { useStore } from 'store';

import Layout from 'components/Layout/Layout';
import FormRecipe from 'blocks/FormRecipe/FormRecipe';
import ErrorFetchGraphQL from 'components/ErrorFetchGraphQL/ErrorFetchGraphQL';

const queryRecipe = `query GetRecipe($recipeId: ID!) {
  recipe(id: $recipeId) {   
    _id   
    name
    description
    cover
    cookingTime
    ingredients      
    steps {
      _id
      number
      cover
      description
    }
  }
}`;

const mutationQuery = `mutation UpdateExistingRecipe($_id: ID!, 
	$name: String!, $description: String!, $cookingTime: String!, $cover: String!,
	$ingredients: String!, $steps: [StepInputData!]!
 ) {
	updateRecipe(id: $_id, recipeInput: {
		name: $name
		description: $description
		cover: $cover
		cookingTime: $cookingTime
		ingredients: $ingredients
		steps: $steps
	}) {
		_id
	}
}`;

const Edit = () => {
	const router = useRouter();
	const { id } = router.query;
	// Взять необходимый реквизит из стора
	const {
		recipe: { createRecipe, valuesToSave },
	} = useStore();
	const [working, setWorking] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorApi[] | null>(null);

	useEffect(() => {
		async function fetchRecipe() {
			const graphqlQuery = {
				query: queryRecipe,
				variables: { recipeId: id },
			};
			const resData = await fetchGraphQL(JSON.stringify(graphqlQuery));
			const { recipe } = resData.data;
			createRecipe(recipe);
		}
		if (id) {
			fetchRecipe();
		}
	}, [id]);

	/**
	 * Сохранить рецепт
	 */
	const onSubmit = async () => {
		setWorking(true);
		const graphqlQuery = {
			query: mutationQuery,
			variables: valuesToSave,
		};
		const resData = await fetchGraphQL(JSON.stringify(graphqlQuery));
		const { errors } = resData;
		setWorking(false);
		if (!errors) {
			router.push(`/recipe/${id}`);
		}
		setErrors(errors);
	};

	return (
		<Layout>
			<FormRecipe operation="edit" onSubmit={onSubmit} loading={working} />
			{errors && <ErrorFetchGraphQL errors={errors} />}
		</Layout>
	);
};

export default observer(Edit);
