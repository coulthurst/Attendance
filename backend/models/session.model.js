const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Session = new Schema({
  name: {
    type: String
  },
  practices: {
    type: []
  },
  students: {
    type: []
  },
  groupID: {
    type: String
  }
});

module.exports = mongoose.model("Session", Session);
