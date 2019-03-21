const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema({
  name: {
    type: String
  },
  sessions: {
    type: []
  },
  attendance: {
    type: []
  }
});

module.exports = mongoose.model("Student", Student);
