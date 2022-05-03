const db = require("../../db");
const capitalize = require("capitalize");

exports.addTransaksi = async (req, res) => {
  try {
    const cekBuku = await db("transaksi")
      .where("pengembalian", false)
      .andWhere("peminjam_id", req.body.peminjam_id)
      .andWhere("buku_id", req.body.buku_id)
      .select("*");
    if (cekBuku.length > 0) {
      res.status(403).send({
        status: 403,
        message: "User Sudah Meminjam Buku Yang Sama",
      });
      return;
    }
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
  const search = req.query.search ? req.query.search : "";
  try {
    if (search !== "") {
      const data = await db("transaksi")
        .where("transaksi.id", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("transaksi.id", "like", `%${capitalize.words(search)}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("transaksi.id", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("transaksi.id", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", false)
        .where("buku.nama_buku", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("buku.nama_buku", "like", `%${capitalize.words(search)}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("buku.nama_buku", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("buku.nama_buku", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", false)
        .where("peminjam.nama_peminjam", "like", `%${search}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere(
          "peminjam.nama_peminjam",
          "like",
          `%${capitalize.words(search)}%`
        )
        .andWhere("transaksi.pengembalian", false)
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toLowerCase()}%`)
        .andWhere("transaksi.pengembalian", false)
        .orWhere("peminjam.nama_peminjam", "like", `%${search.toUpperCase()}%`)
        .andWhere("transaksi.pengembalian", false)
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
        const lengthAll = await db("transaksi")
        .count("transaksi.id")
        .first();
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
        lengthAll: lengthAll
      });
    } else {
      const data = await db("transaksi")
        .where("transaksi.pengembalian", false)
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

        const lengthAll = await db("transaksi")
        .count("transaksi.id")
        .first();

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

      // console.log(tempData)
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: tempData,
        count: data.length,
        lengthAll: lengthAll
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
