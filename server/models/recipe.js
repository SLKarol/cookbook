const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		cover: { type: String, required: true },
		coverPublicId: { type: String, required: false },
		description: { type: String, required: true },
		cookingTime: { type: String, required: true },
		ingredients: { type: String, required: true },
		/**
		 * Почему не сделал ссылки На другую таблицу:
		 * Связи между таблицами "Рецепт" и "Шаги приготовления"
		 * Решил не делать,
		 * а решил для примера того, как в Mongoose можно записывать массивы
		 * Оставить такой вот способ
		 */
		steps: [
			{
				number: { type: Number, required: true },
				description: { type: String, required: true },
				cover: { type: String, required: false },
				coverPublicId: { type: String, required: false },
			},
		],
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', userSchema);
