import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ResponseListRecipe } from 'types/recipe';
import { fetchGraphQL } from 'lib/apolloClient';

import Layout from 'components/Layout/Layout';
import {
	StepsList,
	RecipeDescription,
	RecipeAction,
	Ingredients,
	Creator,
} from 'blocks/RecipeView';
import Loading from 'components/Loading/Loading';
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
    createdAt    
    creator {
      name
      _id
    }
  }
}`;

const Recipe = () => {
	const { query } = useRouter();
	const { id = '' } = query;
	const graphqlQuery = {
		query: queryRecipe,
		variables: { recipeId: id },
	};
	const { data } = useSWR<ResponseListRecipe>(
		JSON.stringify(graphqlQuery),
		fetchGraphQL
	);
	if (!data) {
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}
	if (data.errors) {
		return (
			<Layout>
				<ErrorFetchGraphQL errors={data.errors} />
			</Layout>
		);
	}

	const {
		recipe: {
			_id,
			cookingTime,
			cover,
			createdAt,
			creator: { _id: creatorId, name: creatorName },
			description,
			ingredients,
			name,
			steps,
		},
	} = data.data;

	return (
		<Layout>
			<h3 className="h3">{name}</h3>
			<RecipeDescription
				cookingTime={cookingTime}
				cover={cover}
				description={description}
			/>
			<Ingredients>{ingredients}</Ingredients>
			<StepsList steps={steps} />
			<Creator creatorName={creatorName} createdAt={createdAt} />
			<RecipeAction id={_id} creatorId={creatorId} />
		</Layout>
	);
};

export default Recipe;
