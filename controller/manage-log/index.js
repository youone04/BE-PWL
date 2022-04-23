const db = require("../../db");

exports.logPeminjaman = async (req, res) => {
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
      .orderBy("transaksi.id", "asc");
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

exports.logPengembalian = async (req, res) => {
  try {
    const data = await db("transaksi")
      .join("peminjam", "peminjam.id", "transaksi.peminjam_id")
      .join("buku", "buku.id", "transaksi.buku_id")
      .select(
        "peminjam.nama_peminjam",
        "buku.nama_buku",
        "transaksi.id",
        "transaksi.start",
        "transaksi.end",
        "transaksi.denda",
        "transaksi.updated_at"
      )
      .orderBy("transaksi.id", "asc")
      .where("transaksi.pengembalian", true);
    const sumDenda = await db.raw(
      `SELECT SUM(denda) FROM transaksi WHERE pengembalian = ${true}`
    );
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data: data,
      total_denda: sumDenda.rows[0].sum,
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
