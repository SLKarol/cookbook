import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import { useStore } from 'store';
import { useCheckToken } from 'lib/user';

import Form from 'components/Form/Form';
import Input from 'components/Form/Input/Input';
import TextArea from 'components/Form/Input/TextArea';
import ImageUpload from 'components/Form/ImageUpload/ImageUpload';
import ListStepsEdit from './ListStepsEdit/ListStepsEdit';
import HeaderForm from './HeaderForm';

import styles from './form.module.css';

interface Props {
	operation: 'add' | 'edit';
	onSubmit?: () => void;
	loading: boolean;
}
const FormRecipe: React.FC<Props> = ({ operation, onSubmit, loading }) => {
	const router = useRouter();
	const hasToken = useCheckToken();
	if (!hasToken) router.push('/login');

	const {
		recipe: {
			onChange,
			recipe: { _id, name, description, cookingTime, cover, ingredients },
			onSelectImage,
			setCheckFormValid,
			checkFormValid,
		},
	} = useStore();

	const onReset = () => {
		if (operation === 'add') {
			router.push('/');
		} else {
			router.push(`/recipe/${_id}`);
		}
	};

	/**
	 * Поставить отметку о валидации и отправить на сервера
	 */
	const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCheckFormValid(true);
		onSubmit && onSubmit();
	};

	return (
		<div>
			<HeaderForm operation={operation} />
			<Form
				className={styles.form}
				onReset={onReset}
				onSubmit={handlerSubmit}
				busy={loading}
			>
				<Input
					caption="Название рецепта"
					id="name"
					className={styles.input}
					value={name}
					onChange={onChange}
					valid={!checkFormValid || name.length > 1}
					disabled={loading}
				/>
				<TextArea
					caption="Краткое описание"
					id="description"
					className={styles.input}
					value={description}
					onChange={onChange}
					valid={!checkFormValid || description.length > 1}
					disabled={loading}
				/>
				<Input
					caption="Время готовки"
					id="cookingTime"
					className={`${styles.input} ${styles.inputSmall}`}
					value={cookingTime}
					onChange={onChange}
					valid={!checkFormValid || cookingTime.length > 1}
					disabled={loading}
				/>
				<TextArea
					caption="Ингредиенты"
					id="ingredients"
					className={styles.input}
					value={ingredients}
					onChange={onChange}
					valid={!checkFormValid || ingredients.length > 1}
					disabled={loading}
				/>
				<ImageUpload
					id="recipe-photo"
					onSelectImage={onSelectImage}
					required
					error={checkFormValid || cover.length > 1}
					selectedImage={cover}
					className={styles.imageUpload}
				/>
				<h5 className="h5">Шаги приготовления</h5>
				<ListStepsEdit />
			</Form>
		</div>
	);
};

export default observer(FormRecipe);
