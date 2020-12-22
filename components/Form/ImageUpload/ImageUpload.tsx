import { Component, createRef } from 'react';
import Image from 'next/image';

import { UploadComponentProps } from 'types/imageUpload';

import PleaseSelectImage from './PleaseSelectImage';

import styles from './styles.module.css';

/**
 * Выбор изображения, предпросмотр загружаемого изображения
 */
class ImageUpload extends Component<UploadComponentProps, {}> {
	private hiddenFileInput = createRef<HTMLInputElement>();

	/**
	 * Юзер выбрал фото
	 */
	onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		let reader = new FileReader();
		const { id = 'upload-photo', files } = e.target;
		if (files?.length) {
			const { onSelectImage } = this.props;
			let file = files[0];
			reader.onloadend = () => {
				onSelectImage && onSelectImage({ id, imageContent: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	handleClick = () => {
		const { hiddenFileInput } = this;
		if (hiddenFileInput.current) hiddenFileInput.current.click();
	};

	render() {
		const {
			id = 'upload-photo',
			required = false,
			selectedImage,
			error = false,
			className = '',
		} = this.props;
		return (
			<div className={className}>
				<input
					id={id}
					ref={this.hiddenFileInput}
					name={id}
					type="file"
					accept="image/*"
					onChange={this.onImageChange}
					className={styles.inputFile}
				/>
				<div className={styles.block}>
					{selectedImage ? (
						<Image
							src={selectedImage}
							width={140}
							height={140}
							layout="intrinsic"
						/>
					) : (
						<PleaseSelectImage error={error} required={required} />
					)}
				</div>
				<button
					className={`button__button ${styles.button}`}
					type="button"
					onClick={this.handleClick}
				>
					Загрузить фото
				</button>
			</div>
		);
	}
}

export default ImageUpload;
