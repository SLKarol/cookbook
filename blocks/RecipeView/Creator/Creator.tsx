import style from './creator.module.css';

interface Props {
	creatorName: string;
	createdAt: string;
}

const Creator: React.FC<Props> = ({ creatorName, createdAt }) => (
	<div className={style.author}>
		{creatorName} {new Date(createdAt).toLocaleDateString()}
	</div>
);

export default Creator;
