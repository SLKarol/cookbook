import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { ErrorApi } from 'types';
import { fetchGraphQL } from 'lib/apolloClient';

import Layout from 'components/Layout/Layout';
import ErrorFetchGraphQL from 'components/ErrorFetchGraphQL/ErrorFetchGraphQL';

import styles from './delete.module.css';

const queryRecipe = `query GetRecipe($recipeId: ID!) {
  recipe(id: $recipeId) {   
    name
  }
}`;

const Delete = () => {
	const router = useRouter();
	const { id } = router.query;
	const [working, setWorking] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorApi[] | null>(null);
	const [name, setName] = useState('');

	useEffect(() => {
		async function fetchRecipe() {
			const graphqlQuery = {
				query: queryRecipe,
				variables: { recipeId: id },
			};
			const resData = await fetchGraphQL(JSON.stringify(graphqlQuery));
			const { recipe } = resData.data;
			setName(recipe.name);
		}
		if (id) {
			fetchRecipe();
		}
	}, [id]);

	/**
	 * Сохранить рецепт
	 */
	const onDelete = async () => {
		setWorking(true);
		const graphqlQuery = {
			query: `mutation {
				deleteRecipe(id: "${id}")
			}`,
		};
		const resData = await fetchGraphQL(JSON.stringify(graphqlQuery));
		const { errors } = resData;
		setWorking(false);
		if (!errors) {
			router.push(`/`);
		}
		setErrors(errors);
	};

	return (
		<Layout>
			<div>
				Вы действительно хотите удалить рецепт <strong>{name}</strong>?
			</div>
			<div className={styles.footer}>
				<button
					type="button"
					className="button__button"
					disabled={working}
					onClick={onDelete}
				>
					Удалить
				</button>
				<Link href={`/recipe/${id}`}>
					<button type="button" className="button__button" disabled={working}>
						Отмена
					</button>
				</Link>
			</div>
			{errors && <ErrorFetchGraphQL errors={errors} />}
		</Layout>
	);
};

export default observer(Delete);
