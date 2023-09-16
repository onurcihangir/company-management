const companies = [
  {
    id: 1,
    name: "Microsoft",
    legalNumber: 1,
    incorporationCountry: "United States",
    website: "http://www.microsoft.com",
  },

  {
    id: 2,
    name: "Apple",
    legalNumber: 1,
    incorporationCountry: "United States",
    website: "http://www.example.com",
  },

  {
    id: 3,
    name: "Amazon",
    legalNumber: 1,
    incorporationCountry: "United States",
    website: "http://www.example.com",
  },

  {
    id: 4,
    name: "Tesla",
    legalNumber: 1,
    incorporationCountry: "United States",
    website: "http://www.example.com",
  },
];

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  legalNumber: Number,
  incorporationCountry: String,
  website: String,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
