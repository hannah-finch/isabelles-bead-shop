//TODO
// the users query is dummy data.... must be changed
const typeDefs = `
type Query {
    me: User
    users: [User]
    products: [Product]
    singleProduct(productId: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): Auth
    login(username: String!, password: String!): Auth
    createProduct(name: String!, price: Int!, description: String!, image: ImageDetailsInput, category: String!, quantity: Int!): Product
    addOrder(products: [ID]!): Order
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
    role: String
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

input ProductInput {
  _id: ID!
  name: String!
  price: Float!
  description: String!
  image: ImageInput
  category: String!
  quantity: Int!
}

type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
}

type Checkout {
    session: ID
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
    
input ImageInput {
    Url: String!
    description: String
    id: String
    name: String
  }
`;
module.exports = typeDefs;
