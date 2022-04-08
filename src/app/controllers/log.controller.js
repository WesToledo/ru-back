const LogSchema = require("../models/log");

async function create({ ra, type }) {
  try {
    await LogSchema.create({ ra, date: new Date(), type });
    return { error: false };
  } catch (err) {
    return { error: true };
  }
}

async function get() {
  try {
    const today = new Date();

    const logs = await LogSchema.find({
      created_on: {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDay()
        ),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDay() + 1
        ),
      },
    });

    if (new Date().getHours() > 10 && new Date().getHours() < 16) {
      const aux = logs.filter(
        (log) =>
          new Date(log.date).getHours() > 10 &&
          new Date(log.date).getHours() < 16
      );

      return {
        logs: aux?.length ? aux : [],
      };
    }

    if (new Date().getHours() > 16 && new Date().getHours() < 19) {
      const aux = logs.filter(
        (log) =>
          new Date(log.date).getHours() > 16 &&
          new Date(log.date).getHours() < 19
      );

      return {
        logs: aux?.length ? aux : [],
      };
    }

    return [];
  } catch (err) {
    return { error: true };
  }
}

module.exports = {
  create,
  get,
};
