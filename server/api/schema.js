const { gql } = require('apollo-server-express')

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  # scalar Upload

  # scalar Date

  type Item {
    id: ID!
    title: String!
    description: String
    owner: User!
    borrower: User
    tags: [Tag!]!
  }

  type User {
    id: ID!
    username: String!
    bio: String 
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type Viewer {
    viewer: User
  }

  input NewItemInput {
    title: String!
    description: String!
    borrowerID: ID
    tags: [ID]
  }

  input NewUserInput {
    username: String!
    email: String!
    password: String!
    bio: String
  }

  input NewBorrowerInput {
    itemID: ID!
  }

  input NewReturnInput {
    itemID: ID!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(idToOmit: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(input: NewItemInput!): Item!
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    addBorrower(input: NewBorrowerInput!): Item!
    returnItem(input: NewReturnInput!): Item!
  }
`
