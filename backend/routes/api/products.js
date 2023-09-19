const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Product = require("../../models/products");
const Company = require("../../models/companies");
const auth = require("../../auth");

router.get("/", auth, (req, res) => {
  var page = parseInt(req.query.current) || 0; // default 0
  var limit = parseInt(req.query.pageSize) || 10; // default 10
  // default sort by _id
  // if user click to cancel sorting then sort by _id
  var sortBy = req.query.sortOrder ? req.query.sortBy : "_id";
  var sortOrder =
    req.query.sortOrder === "ascend"
      ? 1
      : req.query.sortOrder === "descend"
      ? -1
      : null;

  var query = {};
  Product.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
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
          return res.status(500).send({
            message: "Error when fetching Products",
            err,
          });
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
        return res.status(500).send({
          message: "Error when creating new Product",
          err,
        });
      });
  });
});

//Update Product

router.put("/:id", auth, (req, res) => {
  // const newProduct = new Product(req.body);
  if (req.body.company) {
    Company.findById({ _id: req.body.company })
      .then((data) => {
        const body = {
          ...req.body,
          company: data,
        };
        Product.findByIdAndUpdate(req.params.id, body)
          .then(() => {
            res.status(200).send({ message: "Success!" });
          })
          .catch((err) => {
            return res.status(500).send({
              message: "Error when updating Product",
              err,
            });
          });
      })
      .catch((err) => {
        return res.status(400).send({ message: "Company not found" });
      });
  } else {
    return res.status(400).send({ message: "Company must be select" });
  }
});

//Delete Product

router.delete("/:id", auth, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Success!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error when deleting Product",
        err,
      });
    });
});

router.get("/getList", auth, (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error when fetching Products",
        err,
      });
    });
});

module.exports = router;
