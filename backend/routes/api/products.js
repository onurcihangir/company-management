const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Product = require("../../products");
const Company = require("../../companies");
const auth = require("../../auth");

router.get("/", auth, (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/", auth, (req, res) => {
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
        res.status(200).send({ message: "Success!" });
      })
      .catch((err) => {
        throw err;
      });
  });
});

//Update Product

router.put("/:id", auth, (req, res) => {
  // const newProduct = new Product(req.body);
  Company.findById({ _id: req.body.company }).then((data) => {
    const body = {
      ...req.body,
      company: data,
    };
    Product.findByIdAndUpdate(req.params.id, body)
      .then(() => {
        res.status(200).send({ message: "Success!" });
      })
      .catch((err) => {
        throw err;
      });
  });
});

//Delete Product

router.delete("/:id", auth, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
