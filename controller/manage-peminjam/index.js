const db = require("../../db");


exports.addPeminjam = async (req, res) => {
    try {
      await db("peminjam").insert(req.body);
      res.status(200).send({
        status: 200,
        message: "Sucesss",
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

exports.getPeminjam =async (req, res) => {
    try {
      const data =   await db("peminjam").orderBy('id','asc');
        res.status(200).send({
          status: 200,
          message: "Sucesss",
          data: data
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
}
