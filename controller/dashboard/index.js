const db = require("../../db");

exports.dashboard = async (req, res) => {
  try {
    const user = await db("user").count("id").first();
    const buku = await db("buku").count("id").first();
    const anggota = await db("peminjam").count("id").first();
    const data = {
      user: user.count,
      buku: buku.count,
      anggota: anggota.count,
    };
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
