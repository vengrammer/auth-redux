const userSchema = `#graphql
  type User {
    _id: ID!
    name: String!
    username: String!
    role: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Message {
    message: String!
  }

  type Mutation {
    register(name: String!, username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
     logout: Message!
  }
`;

export default userSchema;
