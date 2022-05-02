const db = require("../../db");
const capitalize = require("capitalize");

exports.logPeminjaman = async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  try {
    if (search !== "") {
      const data = await db("transaksi")
        .where("transaksi.id", "like", `%${search}%`)
        .orWhere("transaksi.id", "like", `%${capitalize.words(search)}%`)
        .orWhere("transaksi.id", "like", `%${search.toLowerCase()}%`)
        .orWhere("transaksi.id", "like", `%${search.toUpperCase()}%`)
        .where("buku.nama_buku", "like", `%${search}%`)
        .orWhere("buku.nama_buku", "like", `%${capitalize.words(search)}%`)
        .orWhere("buku.nama_buku", "like", `%${search.toLowerCase()}%`)
        .orWhere("buku.nama_buku", "like", `%${search.toUpperCase()}%`)
        .where("peminjam.nama_peminjam", "like", `%${search}%`)
        .orWhere(
          "peminjam.nama_peminjam",
          "like",
          `%${capitalize.words(search)}%`
        )
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toLowerCase()}%`)
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toUpperCase()}%`)
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
      let tempData = [];
      if (data.length > parseInt(req.query.limit)) {
        tempData = data
          .slice(0)
          .slice(
            parseInt(req.query.offset),
            parseInt(req.query.offset) + parseInt(req.query.limit)
          );
      } else {
        tempData = data;
      }
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: tempData,
        count: data.length,
      });
    } else {
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
      let tempData = [];
      if (data.length > parseInt(req.query.limit)) {
        tempData = data
          .slice(0)
          .slice(
            parseInt(req.query.offset),
            parseInt(req.query.offset) + parseInt(req.query.limit)
          );
      } else {
        tempData = data;
      }
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: tempData,
        count: data.length,
      });
    }
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
  const search = req.query.search ? req.query.search : "";
  try {
    if (search !== "") {
      const data = await db("transaksi")
        .where("transaksi.id", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("transaksi.id", "like", `%${capitalize.words(search)}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("transaksi.id", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("transaksi.id", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", true)
        .where("buku.nama_buku", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("buku.nama_buku", "like", `%${capitalize.words(search)}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("buku.nama_buku", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("buku.nama_buku", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", true)
        .where("peminjam.nama_peminjam", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere(
          "peminjam.nama_peminjam",
          "like",
          `%${capitalize.words(search)}%`
        )
        .andWhere("transaksi.pengembalian", true)
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", true)
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", true)
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
        .orderBy("transaksi.id", "asc");
      const sumDenda = await db.raw(
        `SELECT SUM(denda) FROM transaksi WHERE pengembalian = ${true}`
      );
      let tempData = [];
      if (data.length > parseInt(req.query.limit)) {
        tempData = data
          .slice(0)
          .slice(
            parseInt(req.query.offset),
            parseInt(req.query.offset) + parseInt(req.query.limit)
          );
      } else {
        tempData = data;
      }
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: tempData,
        count: data.length,
        total_denda: sumDenda.rows[0].sum,
      });
      
    }else{
      const data = await db("transaksi")
      .join("peminjam", "peminjam.id", "transaksi.peminjam_id")
      .join("buku", "buku.id", "transaksi.buku_id")
      .where("transaksi.pengembalian", true)
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
    const sumDenda = await db.raw(
      `SELECT SUM(denda) FROM transaksi WHERE pengembalian = ${true}`
    );
    let tempData = [];
    if (data.length > parseInt(req.query.limit)) {
      tempData = data
        .slice(0)
        .slice(
          parseInt(req.query.offset),
          parseInt(req.query.offset) + parseInt(req.query.limit)
        );
    } else {
      tempData = data;
    }
    res.status(200).send({
      status: 200,
      message: "Sucesss",
      data: tempData,
      count: data.length,
      total_denda: sumDenda.rows[0].sum,
    });
    }
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
