const db = require("../../db");

exports.laporanDenda = async (req, res) => {
  try {
    const data = await db.raw(`SELECT peminjam.nama_peminjam,buku.nama_buku,transaksi.id ,transaksi.denda,transaksi.updated_at FROM transaksi JOIN peminjam ON peminjam.id = transaksi.peminjam_id JOIN buku ON buku.id = transaksi.buku_id WHERE transaksi.pengembalian = true AND to_char(transaksi.created_at, 'YYYY-MM') = '${req.query.month}' AND denda > 0`)
    const sumDenda = await db.raw(
      `SELECT SUM(denda) FROM transaksi WHERE pengembalian = ${true}  AND to_char(transaksi.created_at, 'YYYY-MM') = '${req.query.month}'`
    );

    let tempData = [];
    if (data.rows.length > parseInt(req.query.limit)) {
      tempData = data.rows
        .slice(0)
        .slice(
          parseInt(req.query.offset),
          parseInt(req.query.offset) + parseInt(req.query.limit)
        );
    } else {
      tempData = data.rows;
    }
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data: tempData,
      dataAll: data.rows,
      count: data.rows.length,
      denda: sumDenda.rows[0].sum,
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
