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
