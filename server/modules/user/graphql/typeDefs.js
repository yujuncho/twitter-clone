const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  extend type Query {
    users: [User]!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    createdAt: Date!
  }

  extend type Mutation {
    createUser(username: String!, password: String!): AddUserResponse!
  }

  type AddUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
`;

module.exports = userTypeDefs;
