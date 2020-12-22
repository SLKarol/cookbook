import { FC } from 'react';

import { RecipePreview } from 'types/recipe';

import Preview from './Preview';

import styles from './recipes.module.css';

type Props = {
	recipes: RecipePreview[];
};

const Recipes: FC<Props> = ({ recipes }) => {
	return (
		<div className={styles.recipes}>
			{recipes.map((r) => (
				<Preview key={r._id} {...r} />
			))}
		</div>
	);
};

export default Recipes;
