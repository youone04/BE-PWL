const db = require("../../db");

exports.addTransaksi = async (req, res) => {
  try {
    await db("transaksi").insert(req.body);
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

exports.getTransaksi = async (req, res) => {
  try {
    const data = await db("transaksi")
      .join("peminjam", "peminjam.id", "transaksi.peminjam_id")
      .join("buku", "buku.id", "transaksi.buku_id")
      .select(
        "peminjam.nama_peminjam",
        "buku.nama_buku",
        "transaksi.start",
        "transaksi.end",
        "transaksi.id",
        "transaksi.jumlah_perpanjang"
      )
      .orderBy('transaksi.id','asc')
      .where("transaksi.pengembalian", false);
    const count = await db("transaksi").count("id").first();
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data: data,
      count: count,
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

exports.pengembalian = async (req, res) => {
  // const {denda , pengembalian} = req.body;
  try {
    await db("transaksi").where("id", req.params.id).update(req.body);
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

exports.perpanjangan = async (req, res) => {
  // const {denda , pengembalian} = req.body;
  try {
    await db("transaksi")
      .where("id", req.params.id)
      .increment("jumlah_perpanjang", 1)
      .update(req.body);
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
