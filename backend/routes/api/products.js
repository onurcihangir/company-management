const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Product = require("../../products");
const Company = require("../../companies");

router.get("/", (req, res) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/", (req, res) => {
  Company.findById({ _id: req.body.company }).then((data) => {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      amount: req.body.amount,
      amountUnit: req.body.amountUnit,
      company: data,
    });
    newProduct
      .save()
      .then(() => {
        res.send({ message: "Success!" });
      })
      .catch((err) => {
        throw err;
      });
  });
});

//Update Product

router.put("/:id", (req, res) => {
  // const newProduct = new Product(req.body);
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

//Delete Product

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
