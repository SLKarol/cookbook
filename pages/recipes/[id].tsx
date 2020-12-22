import { useRouter } from 'next/router';
import useSWR from 'swr';

import { RecipePreview } from 'types/recipe';
import { fetchGraphQL } from 'lib/apolloClient';

import Recipes from 'blocks/Recipes/Recipes';
import Layout from 'components/Layout/Layout';
import Pagination from 'components/Pagination/Pagination';
import About from 'components/About/About';
import Loading from 'components/Loading/Loading';

const RECORDS_PER_PAGE = 4;

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
	data: {
		recipes: {
			recipes: RecipePreview[];
			totalRecipes: number;
		};
	};
};

const ListRecipes: React.FC = () => {
	const { query } = useRouter();
	const { id = '' } = query;
	const graphqlQuery = {
		query: queryRecipes,
		variables: { page: +id },
	};
	const { data } = useSWR<Props>(JSON.stringify(graphqlQuery), fetchGraphQL);
	const recipes = data?.data.recipes.recipes || [];
	const totalRecipes = data?.data.recipes.totalRecipes || 0;
	return (
		<Layout>
			<About />
			{!data && <Loading />}
			<Recipes recipes={recipes} />
			<Pagination
				recordsPerPage={RECORDS_PER_PAGE}
				totalRecords={totalRecipes}
				current={+id}
				busy={!data}
			/>
		</Layout>
	);
};

export default ListRecipes;
