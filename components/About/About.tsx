import styles from './about.module.css';

const About: React.FC = () => {
	return (
		<div className={styles.div}>
			<div className={styles.description}>
				<h2 className={`h2 ${styles.header}`}>Вкусный проект</h2>
				<p className={styles.p}>
					Представляю Вам проект &quot;Кулинарная книга&quot; , сделанный с
					целью обмена рецептами между всеми пользователями сети интернет.
				</p>
			</div>
			<img src="../images/intro.jpg" className={styles.img} />
		</div>
	);
};

export default About;
