const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Product = require("../../products");
const Company = require("../../companies");
const auth = require("../../auth");

router.get("/", auth, (req, res) => {
  var page = parseInt(req.query.current) || 0; //for next page pass 1 here
  var limit = parseInt(req.query.pageSize) || 10;
  var query = {};
  Product.find(query)
    .skip((page - 1) * limit) //Notice here
    .limit(limit)
    .exec()
    .then((doc) => {
      Product.estimatedDocumentCount(query)
        .exec()
        .then((count) => {
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            products: doc,
          });
        })
        .catch((err) => {
          return res.json(err);
        });
    })
    .catch((err) => {
      return res.json(err);
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
