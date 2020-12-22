import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { RecipePreview } from 'types/recipe';
import { fetchGraphQl } from 'lib/apolloClient';

import Recipes from 'blocks/Recipes/Recipes';
import Layout from 'components/Layout/Layout';
import Pagination from 'components/Pagination/Pagination';
import About from 'components/About/About';

const RECORDS_PER_PAGE = 4;

const queryRecipesCount = `query {  
  allRecipes {
    totalRecipes
  }
}`;

const queryRecipes = `query getRecipes($page: Int, $perPage: Int) {
	recipes(page: $page, perPage: $perPage) {
		recipes {
			_id
			name
			description
			cover
			createdAt
			creator {
				_id
				name
			}
		}
		totalRecipes
  }
}`;
type Props = {
	recipes: {
		data: {
			recipes: {
				recipes: RecipePreview[];
				totalRecipes: number;
			};
		};
	};
};

const ListRecipes: React.FC<Props> = ({
	recipes: {
		data: {
			recipes: { recipes = [], totalRecipes = 0 },
		},
	},
}) => {
	const { query } = useRouter();
	const { id = '' } = query;
	return (
		<Layout>
			<About />
			<Recipes recipes={recipes} />
			<Pagination
				recordsPerPage={RECORDS_PER_PAGE}
				totalRecords={totalRecipes}
				current={+id}
				busy={false}
			/>
		</Layout>
	);
};

export async function getStaticPaths() {
	const graphqlQuery = {
		query: queryRecipesCount,
		variables: { page: 1 },
	};
	const resData = await fetchGraphQl(JSON.stringify(graphqlQuery));
	const { totalRecipes } = resData.data.allRecipes;
	const paths = [];
	for (let i = 1; i <= Math.ceil(totalRecipes / RECORDS_PER_PAGE); i++) {
		paths.push({ params: { id: '' + i } });
	}
	return {
		paths: paths.length ? paths : [{ params: { id: '1' } }],
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async ({
	params = { id: '1' },
}) => {
	const page = params.id as string;
	const graphqlQuery = {
		query: queryRecipes,
		variables: { page: +page },
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
		props: { recipes: resData },
		revalidate: 1,
	};
};

export default ListRecipes;
