const products = [
  {
    id: 1,
    name: "Microsoft",
    category: "PC",
    amount: 5,
    amountUnit: "Piece",
    company: {
      id: 1,
      name: "Microsoft",
    },
  },

  {
    id: 2,
    name: "Microsoft",
    category: "PC",
    amount: 5,
    amountUnit: "Piece",
    company: {
      id: 2,
      name: "Apple",
    },
  },

  {
    id: 3,
    name: "Microsoft",
    category: "PC",
    amount: 5,
    amountUnit: "Piece",
    company: {
      id: 3,
      name: "Amazon",
    },
  },

  {
    id: 4,
    name: "Microsoft",
    category: "PC",
    amount: 5,
    amountUnit: "Piece",
    company: {
      id: 4,
      name: "Tesla",
    },
  },
];

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
