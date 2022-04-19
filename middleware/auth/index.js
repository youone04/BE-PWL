const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifikasi = () => {
  return (req, res, next) => {
    // cek authorizzation header
    var tokenWithBearer = req.headers.authorization;
    try {
      var token = tokenWithBearer.split(" ")[1];
      // verifikasi
      jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            status: 401,
            auth: false,
            message: error.response && error.response.data.message ? error.response.data.message : error.message,
          });
        } else {
          req.auth = decoded;
          next(); //callback
        }
      });
    } catch (error) {
      return res.status(401).send({
        status: 401,
        auth: false,
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
};
module.exports = verifikasi;
