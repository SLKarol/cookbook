import styles from './style.module.css';

interface Props {
	cookingTime: string;
	cover: string;
	description: string;
}

/**
 * Описание рецепта
 */
const RecipeDescription: React.FC<Props> = ({
	cookingTime,
	cover,
	description,
}) => {
	return (
		<div className={styles.component}>
			<img src={cover} alt="" className={styles.cover} />
			<div>
				<div className={styles.wrap}>{description}</div>
				<div>
					<strong className={styles.cookingTime}>Время готовки:</strong>
					{cookingTime}
				</div>
			</div>
		</div>
	);
};

export default RecipeDescription;
