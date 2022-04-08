const mongoose = require("../../database");

const LogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  type: {
    type: Number, // (1 - in) (0 - out)
    required: true,
  },
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
