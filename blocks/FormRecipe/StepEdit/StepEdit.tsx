import { observer } from 'mobx-react-lite';

import { useStore } from 'store';
import { StepUI } from 'types/step';

import ImageUpload from 'components/Form/ImageUpload/ImageUpload';
import TextArea from 'components/Form/Input/TextArea';
import StepTools from './StepTools';

type Props = {
	step: StepUI;
};

/**
 * Блок создания-редактирования шага рецепта
 */
const StepEdit: React.FC<Props> = ({ step }) => {
	const {
		recipe: { onChangeStep, onSelectImage, checkFormValid },
	} = useStore();

	const { _id, nameStep, description, cover, canDeleteIt } = step;

	return (
		<div>
			<div>
				{nameStep ? <div>{nameStep}</div> : null}
				<TextArea
					caption="Описание"
					name="description"
					value={description}
					data-step-id={_id}
					onChange={onChangeStep}
					valid={!checkFormValid || description.length > 1}
				/>
				<ImageUpload
					id={_id}
					required={false}
					selectedImage={cover}
					onSelectImage={onSelectImage}
				/>
			</div>
			<StepTools canDeleteIt={canDeleteIt} idStep={_id} />
		</div>
	);
};

export default observer(StepEdit);
