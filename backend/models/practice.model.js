const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Practice = new Schema(
  {
    attendance: {
      type: []
    },
    sessionID: {
      type: String
    },
    date: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Practice", Practice);
