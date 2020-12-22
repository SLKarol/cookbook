import { GetStaticProps } from 'next';

import { RecipeResponse } from 'types/recipe';
import { fetchGraphQl } from 'lib/apolloClient';

import Layout from 'components/Layout/Layout';
import {
	StepsList,
	RecipeDescription,
	RecipeAction,
	Ingredients,
	Creator,
} from 'blocks/RecipeView';

type TRecipe = {
	data: {
		recipe: RecipeResponse;
	};
};

const queryRecipesId = `query {  
  allRecipes {
    recipes {
      _id
    }
  }
}`;

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

const Recipe = ({ recipe }: { recipe: TRecipe }) => {
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
	} = recipe.data;

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

export async function getStaticPaths() {
	const graphqlQuery = {
		query: queryRecipesId,
		variables: {},
	};
	const resData = await fetchGraphQl(JSON.stringify(graphqlQuery));
	const paths = resData.data.allRecipes.recipes.map((r: { _id: string }) => ({
		params: { id: r._id },
	}));
	return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const graphqlQuery = {
		query: queryRecipe,
		variables: { recipeId: params?.id },
	};
	const resData = await fetchGraphQl(JSON.stringify(graphqlQuery));

	if (resData.data === null) {
		return {
			props: {
				errors: resData.errors,
			},
		};
	}

	return {
		props: { recipe: resData },
		// Re-generate the post at most once per second
		// if a request comes in
		revalidate: 1,
	};
};

export default Recipe;
