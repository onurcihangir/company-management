const express = require("express");

const router = express.Router();

// const uuid = require("uuid");

const Company = require("../../companies");

router.get("/", (req, res) => {
  Company.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/", (req, res) => {
  console.log(req);
  const newCompany = new Company({
    name: req.body.name,
    legalNumber: req.body.legalNumber,
    incorporationCountry: req.body.incorporationCountry,
    website: req.body.website,
  });

  console.log(newCompany);

  newCompany
    .save()
    .then(() => {
      res.send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });

  // companies.push(newUser);

  // res.json(companies);
});

//Update Company

router.put("/:id", (req, res) => {
  // const newCompany = new Company(req.body);
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

//Delete Company

router.delete("/:id", (req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ message: "Success!" });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
