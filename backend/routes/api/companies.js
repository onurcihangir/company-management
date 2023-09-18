const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Company = require("../../companies");
const auth = require("../../auth");

router.get("/", auth, (req, res) => {
  var page = parseInt(req.query.current) || 0;
  var limit = parseInt(req.query.pageSize) || 10;
  var sortBy = req.query.sortBy || "_id"; // default _id
  var sortOrder =
    req.query.sortOrder === "ascend"
      ? 1
      : req.query.sortOrder === "descend"
      ? -1
      : null;
  var query = {};
  Company.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec()
    .then((doc) => {
      Company.estimatedDocumentCount(query)
        .exec()
        .then((count) => {
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            companies: doc,
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
  const newCompany = new Company({
    name: req.body.name,
    legalNumber: req.body.legalNumber,
    incorporationCountry: req.body.incorporationCountry,
    website: req.body.website,
  });

  newCompany
    .save()
    .then(() => {
      res.status(200).send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });

  // companies.push(newUser);

  // res.json(companies);
});

//Update Company

router.put("/:id", auth, (req, res) => {
  // const newCompany = new Company(req.body);
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

//Delete Company

router.delete("/:id", auth, (req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/getList", auth, (req, res) => {
  Company.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
