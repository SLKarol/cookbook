const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const schema = require("../schema/schema");

const app = express();
const PORT = 3005;

mongoose.connect(
  "mongodb+srv://cook:eQdiekbEWL8FhjKJ@cluster0.lyouc.mongodb.net/cookbook?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started!");
});
