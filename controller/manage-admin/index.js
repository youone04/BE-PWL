const db = require("../../db");

exports.admin = async (req, res) => {
  try {
    const data = await db("user");
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
