interface Props {
	operation: 'add' | 'edit';
}

const HeaderForm: React.FC<Props> = ({ operation }) => {
	return (
		<h2 className="h2">
			{operation === 'add' ? 'Добавить рецепт' : 'Редактировать рецепт'}
		</h2>
	);
};

export default HeaderForm;
