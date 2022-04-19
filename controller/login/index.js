const db = require("../../db");
var jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hasil = await db("user")
      .select("id", "username")
      .where("username", username)
      .where("password", password)
      .first();
    if (hasil) {
      const dataUSer = {
        id: hasil.id,
        username: hasil.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
      };
      let token = await jwt.sign(dataUSer, process.env.SECRET_TOKEN);
      return res.status(200).send({
        status: 200,
        message: "success",
        token: token,
      });
    } else {
      return res.status(404).send({
        status: 404,
        message: "Username dan password tidak cocok",
        token: "-",
      });
    }
  } catch (error) {
    console.log(error.response && error.response.data.message ? error.response.data.message : error.message)
    res.status(500).send({
      status: 500,
      message: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

exports.auth = (req, res) => {
  res.status(200)
  .send({
    status: 200,
    auth: true,
    message: 'Success'
  })
} 