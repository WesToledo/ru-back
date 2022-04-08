const LogSchema = require("../models/log");

async function create({ ra }) {
  try {
    await LogSchema.create({ ra, date: new Date() });
    return { error: false };
  } catch (err) {
    return { error: true };
  }
}

module.exports = {
  create,
};
