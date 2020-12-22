const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const authMiddleware = require('./middleware/auth');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const formatGraphQLError = require('./lib/formatError');

const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();
	// Возможность удобной обработки POST-запросов
	server.use(bodyParser.json({ limit: '150mb' }));
	server.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
	// CORS
	server.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Methods',
			'OPTIONS, GET, POST, PUT, PATCH, DELETE'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization'
		);
		if (req.method === 'OPTIONS') {
			return res.sendStatus(200);
		}
		next();
	});
	// Звено для авторизации
	server.use(authMiddleware);
	// Настройка graphQL
	server.use(
		'/graphql',
		graphqlHTTP({
			schema: graphqlSchema,
			graphiql: true,
			customFormatErrorFn: formatGraphQLError,
			rootValue: graphqlResolver,
		})
	);

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then((result) => {
			server.listen(port, () => {
				console.log(`> Ready on http://localhost:${port}`);
			});
		})
		.catch((err) => console.log(err));
});
