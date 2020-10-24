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

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    cookingTime: { type: new GraphQLNonNull(GraphQLString) },
    ingredients: { type: new GraphQLNonNull(GraphQLString) },
    steps: {
      type: new GraphQLList(StepType),
      resolve(parent, args) {
        return Steps.find({ recipeId: parent.id }).sort({ number: 1 });
      },
    },
  }),
});

const StepType = new GraphQLObjectType({
  name: "Step",
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: new GraphQLNonNull(GraphQLInt) },
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    recipe: {
      type: RecipeType,
      resolve(parent) {
        return Recipes.findById(parent.recipeId);
      },
    },
  }),
});

const StepInputType = new GraphQLInputObjectType({
  name: "stepInput",
  description: "Создаваемые шаги",
  fields: {
    number: { type: new GraphQLNonNull(GraphQLInt) },
    cover: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    recipeId: { type: GraphQLString },
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
        });
        // Сохранить
        await recipe.save();
        // После сохранения узнать id рецепта
        recipe.id = recipe._id;
        // Записать шаги рецепта в БД
        args.steps.forEach(async (step) => {
          const newStep = new Steps({
            number: step.number,
            cover: step.cover,
            description: step.description,
            recipeId: recipe.id,
          });
          await newStep.save();
        });
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
      async resolve(parent, args) {
        let re = Recipes.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              cookingTime: args.cookingTime,
              cover: args.cover,
              ingredients: args.ingredients,
            },
          },
          { new: true }
        );
        // Удалить все шаги из этого
        await Steps.deleteMany({ recipeId: args.id });
        // Записать шаги рецепта в БД
        args.steps.forEach(async (step) => {
          const newStep = new Steps({
            number: step.number,
            cover: step.cover,
            description: step.description,
            recipeId: args.id,
          });
          await newStep.save();
        });
        return re;
      },
    },
    deleteRecipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        await Steps.deleteMany({ recipeId: args.id });
        return Recipes.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
