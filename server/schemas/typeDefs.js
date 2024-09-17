//TODO
// the users query is dummy data.... must be changed
const typeDefs = `
type Query {
    me: User
    users: [User]
    products: [Product]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, clientName: String!): User
    login(username: String!, password: String!): Auth
    createProduct(name: String!, price: Int!, description: String!, image: ImageDetailsInput, category: String!, quantity: Int!): Product
}
type Auth {
    token: ID!,
    user: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    clientName: String!
}

type Product {
    _id: ID!
    name: String!
    price: Int!
    description: String!
    image: Image
    category: String!
    quantity: Int!
}
input ImageDetailsInput {
    id: ID!
    Url: String!
    name: String!
    description: String!
}
type Image {
    id: ID!
    Url: String!
    name: String!
    description: String!
}    
`;
module.exports = typeDefs;
