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

exports.getPeminjam = async (req, res) => {
  try {
    const data = await db("peminjam").orderBy("id", "asc");
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

exports.deletePeminjam = async (req, res) => {
  const { id } = req.params;
  try {
    await db("peminjam").where("id",id).del();
    res.status(200).send({
      status: 200,
      message: "Sucesss",
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 500,
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

exports.updatePeminjam = async (req, res) => {
  const { id } = req.params;
  const {nama_peminjam , alamat , hp, jk} =req.body;
  try {
    await db("peminjam").where("id",id).update({nama_peminjam , jk , alamat , hp});
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