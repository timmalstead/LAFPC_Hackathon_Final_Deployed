const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
  indicator: String,
  2013: String,
  2017: String,
  2020: String,
  value: String,
  datatype: String
})

const Data = mongoose.model("Data", dataSchema)

module.exports = Data
