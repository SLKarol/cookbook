import styles from './styles.module.css';

const Ingredients: React.FC = ({ children }) => (
	<>
		<h4 className="h4">Ингредиенты</h4>
		<div className={styles.wrap}>{children}</div>
	</>
);

export default Ingredients;
