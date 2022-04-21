const db = require("../../db");

exports.getBuku = async (req, res) => {
  try {
    const data = await db("buku").orderBy('id','asc');
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data: data,
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

exports.addBuku = async (req, res) => {
  try {
    await db("buku").insert(req.body);
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

exports.editBuku = async (req, res) => {
  const { nama_buku, jumlah_buku } = req.body;
  const {id} = req.params;
  try {
    await db("buku").where("id", id).update({ nama_buku, jumlah_buku });
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

exports.deleteBuku = async (req, res) => {
  const {id} = req.params;
  try {
    await db("buku").where("id", id).del();
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
