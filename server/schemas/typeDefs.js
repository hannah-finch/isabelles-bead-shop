//TODO
// the users query is dummy data.... must be changed
const typeDefs = `
type Query {
    users: [User]
}

type Mutation {
    createUser(userName: String!, email: String!, password: String!, clientName: String!): User
}

type User {
_id: ID!
userName: String!
email: String!
password: String!
clientName: String!
}
`;
module.exports = typeDefs;
