const typeDefs = `
type Query {
    me: User
    users: [User]
    products: [Product]
    singleProduct(productId: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    info: [Info]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): Auth
    login(username: String!, password: String!): Auth
    createProduct(name: String!, price: Int!, description: String!, image: String!, category: String!, stock: Int!): Product
    updateProduct(_id:ID!, name: String!, price: Int!, description: String!, image: String!, category: String!, stock: Int!): Product
    deleteProduct(_id:ID!): Product
    addOrder(products: [ID]!): Order
    addReview(_id:ID!, ReviewDetails: ReviewDetailsInput ): Product
    updateStock(products: [UpdateStockInput!]!): Boolean   
    updateInfo(id: Int, announcementTitle: String, announcement: String, about1Title: String, about1Text: String, about2Title: String, about2Text: String): Info
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
    image: String!
    imageURL: String!
    category: String!
    stock: Int!
    reviews: [Review]
}
input ReviewDetailsInput {
    username: String!
    content: String!
    rating: Int!
}
type Review {
    _id: ID!
    username: String!
    content: String!
    rating: Int!
}
input ProductInput {
  _id: ID!
  name: String!
  price: Float!
  description: String!
  image: String!
  category: String!
  stock: Int!
}

type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
}

type Checkout {
    session: ID
}

input UpdateStockInput {
    _id: ID!
    quantity: Int!
  }

type Info {
    id: Int,
    announcementTitle: String,
    announcement: String,
    about1Title: String,
    about1Text: String,
    about2Title: String,
    about2Text: String,
}
`;
module.exports = typeDefs;
