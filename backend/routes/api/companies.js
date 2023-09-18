const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Company = require("../../companies");
const auth = require("../../auth");

router.get("/", auth, (req, res) => {
  var page = parseInt(req.query.current) || 0; //for next page pass 1 here
  var limit = parseInt(req.query.pageSize) || 10;
  var query = {};
  Company.find(query)
    .skip((page - 1) * limit) //Notice here
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
