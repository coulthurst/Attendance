const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Group = new Schema({
  name: {
    type: String
  },
  sessions: {
    type: []
  }
});

module.exports = mongoose.model("Group", Group);
