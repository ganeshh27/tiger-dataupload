const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  sku: String,
  name: String,
  price: Number,
  description: String,
  cateogory: String,
  brand: String,
  color: String,
  ratingAvg: String,
  inventoryCount: String,
  dateCreated: String,
});

module.exports = mongoose.model('products', productSchema);
