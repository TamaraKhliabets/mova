const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    #      login: User! 
    getUser(id: ID!): User!
    getAllUsers: [User!]!
    #      verifyEmail()
  }
  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
    #      updateUser(id: ID!, updateUser: UserInput!): User! 
    #      changePassword()
    #      updateToken()
    #      verificationEmail()
    #      resetPassword()
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
    bio: String
    image: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    #    created_at: Date!
    #    updated_at: Date!
    bio: String
    image: String
    email_verified: Boolean
    refresh_token: String
    access_token: String
  }
  type AuthResp {
    user: User!
    #     token: String!
  }

  #  type Date {
  #    data: String
  #  }
`;
