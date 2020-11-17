const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const Steps = require("../models/step");
const Recipes = require("../models/recipe");

const StepType = new GraphQLObjectType({
  name: "Step",
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: new GraphQLNonNull(GraphQLInt) },
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    cookingTime: { type: new GraphQLNonNull(GraphQLString) },
    ingredients: { type: new GraphQLNonNull(GraphQLString) },
    steps: { type: new GraphQLList(StepType) },
  }),
});

const StepInputType = new GraphQLInputObjectType({
  name: "stepInput",
  description: "Шаги рецепта",
  fields: {
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    number: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Recipes.findById(args.id);
      },
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve() {
        return Recipes.find({}).sort("name");
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    insertOneRecipe: {
      type: RecipeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        cookingTime: { type: new GraphQLNonNull(GraphQLString) },
        cover: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: { type: new GraphQLNonNull(GraphQLString) },
        steps: {
          type: new GraphQLNonNull(new GraphQLList(StepInputType)),
        },
      },
      async resolve(parent, args) {
        // Создать запись рецепта
        const recipe = new Recipes({
          name: args.name,
          description: args.description,
          cookingTime: args.cookingTime,
          cover: args.cover,
          ingredients: args.ingredients,
          steps: args.steps,
        });
        // Сохранить
        await recipe.save();
        return recipe;
      },
    },
    updateRecipe: {
      type: RecipeType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        cookingTime: { type: new GraphQLNonNull(GraphQLString) },
        cover: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: { type: new GraphQLNonNull(GraphQLString) },
        steps: {
          type: new GraphQLNonNull(new GraphQLList(StepInputType)),
        },
      },
      resolve(parent, args) {
        return Recipes.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              cookingTime: args.cookingTime,
              cover: args.cover,
              ingredients: args.ingredients,
              steps: args.steps,
            },
          },
          { new: true }
        );
      },
    },
    deleteRecipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Recipes.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
