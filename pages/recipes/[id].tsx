import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ResponsePreview } from 'types/recipe';
import { fetchGraphQL } from 'lib/apolloClient';

import Recipes from 'blocks/Recipes/Recipes';
import Layout from 'components/Layout/Layout';
import Pagination from 'components/Pagination/Pagination';
import About from 'components/About/About';
import Loading from 'components/Loading/Loading';
import ErrorFetchGraphQL from 'components/ErrorFetchGraphQL/ErrorFetchGraphQL';

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

const ListRecipes: React.FC = () => {
	const { query } = useRouter();
	const { id = '' } = query;

	const graphqlQuery = {
		query: queryRecipes,
		variables: { page: +id, perPage: RECORDS_PER_PAGE },
	};
	const { data } = useSWR<ResponsePreview>(
		JSON.stringify(graphqlQuery),
		fetchGraphQL
	);

	if (!data) {
		return (
			<Layout>
				<About />
				<Loading />
			</Layout>
		);
	}
	if (data.errors) {
		return (
			<Layout>
				<About />
				<ErrorFetchGraphQL errors={data.errors} />
			</Layout>
		);
	}

	const {
		data: {
			recipes: { recipes = [], totalRecipes = 0 },
		},
	} = data;

	return (
		<Layout>
			<About />
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
