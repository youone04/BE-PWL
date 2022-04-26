const db = require("../../db");
const capitalize = require("capitalize");

exports.getBuku = async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  try {
    if (search !== "") {
      const data = await db("buku")
        .where("id", "like", `%${search}%`)
        .orWhere("id", "like", `%${capitalize.words(search)}%`)
        .orWhere("id", "like", `%${search.toLowerCase()}%`)
        .orWhere("id", "like", `%${search.toUpperCase()}%`)
        .where("nama_buku", "like", `%${search}%`)
        .orWhere("nama_buku", "like", `%${capitalize.words(search)}%`)
        .orWhere("nama_buku", "like", `%${search.toLowerCase()}%`)
        .orWhere("nama_buku", "like", `%${search.toUpperCase()}%`)
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
      const data = await db("buku").orderBy("id", "asc");
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
    console.log(error);
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
  const { id } = req.params;
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
  const { id } = req.params;
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
