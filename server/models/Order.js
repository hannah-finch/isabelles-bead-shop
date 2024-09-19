// THIS FILE IS NOT NEEDED. DO NOT EDIT
// This is for if we ever want to support keeping track of orders
// and storing them in a database or file.

//the model will have:
// it's own _id
//  a reference to the product model _id
// the date the order was placed

const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;