const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Step {
        _id: ID!
        number: Int!
        cover: String
        description: String!

    }
    type Recipe {
        _id: ID!
        name: String!
        description: String!
        cover: String!
        cookingTime: String!
        ingredients : String!
        creator: User!
        steps: [Step!]!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String
        email: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input StepInputData {
        description: String!
        number: Int!
        cover: String
    }

    input RecipeInputData {
        name: String!
        description: String!
        cover: String!
        cookingTime: String!
        ingredients: String!
        steps: [StepInputData!]!
    }

    type RecipeData {
        recipes: [Recipe!]!
        totalRecipes: Int!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        user: User!
        recipes(page: Int, perPage: Int): RecipeData!
        allRecipes: RecipeData!
        recipe(id: ID!): Recipe!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createRecipe(recipeInput: RecipeInputData): Recipe!
        updateRecipe(id: ID!, recipeInput: RecipeInputData): Recipe!
        deleteRecipe(id: ID!): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
