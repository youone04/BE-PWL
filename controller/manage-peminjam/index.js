const db = require("../../db");
const capitalize = require("capitalize");

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
  const search = req.query.search ? req.query.search : "";

  try {
    if (search !== "") {
      const data = await db("peminjam")
        .where("id", "like", `%${search}%`)
        .orWhere("id", "like", `%${capitalize.words(search)}%`)
        .orWhere("id", "like", `%${search.toLowerCase()}%`)
        .orWhere("id", "like", `%${search.toUpperCase()}%`)
        .where("nama_peminjam", "like", `%${search}%`)
        .orWhere("nama_peminjam", "like", `%${capitalize.words(search)}%`)
        .orWhere("nama_peminjam", "like", `%${search.toLowerCase()}%`)
        .orWhere("nama_peminjam", "like", `%${search.toUpperCase()}%`)
        .orderBy("id", "asc");
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
      const data = await db("peminjam").orderBy("id", "asc");
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

exports.deletePeminjam = async (req, res) => {
  const { id } = req.params;
  try {
    await db("peminjam").where("id", id).del();
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

exports.updatePeminjam = async (req, res) => {
  const { id } = req.params;
  const { nama_peminjam, alamat, hp, jk } = req.body;
  try {
    await db("peminjam")
      .where("id", id)
      .update({ nama_peminjam, jk, alamat, hp });
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
