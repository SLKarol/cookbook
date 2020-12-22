module.exports = (error) => {
	if (!error.originalError) {
		return error;
	}
	const data = error.originalError.data;
	const message = error.message || 'Произошла ошибка.';
	const code = error.originalError.code || 500;
	return { message: message, status: code, data: data };
};
