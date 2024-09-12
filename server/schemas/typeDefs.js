//TODO
// the users query is dummy data.... must be changed
const typeDefs = `
type Query {
    users: [User]
    products: [Product]
}

type Mutation {
    createUser(userName: String!, email: String!, password: String!, clientName: String!): User
    createProduct(name: String!, price: Int!, description: String!, imageURL: String!, category: String!, quantity: Int!): Product
}

type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    clientName: String!
}

type Product {
    _id: ID!
    name: String!
    price: Int!
    description: String!
    imageURL: String!
    category: String!
    quantity: Int!
}
`;
module.exports = typeDefs;
