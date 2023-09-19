const Company = require("./companies").schema;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  category: String,
  amount: Number,
  amountUnit: String,
  company: Company,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
