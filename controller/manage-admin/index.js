const db = require("../../db");
const capitalize = require("capitalize");

exports.admin = async (req, res) => {
  const search = req.query.search ? req.query.search : "";

  try {
    if (search !== "") {
      const data = await db("user")
        .where("id", "like", `%${search}%`)
        .orWhere("id", "like", `%${capitalize.words(search)}%`)
        .orWhere("id", "like", `%${search.toLowerCase()}%`)
        .orWhere("id", "like", `%${search.toUpperCase()}%`)
        .where("username", "like", `%${search}%`)
        .orWhere("username", "like", `%${capitalize.words(search)}%`)
        .orWhere("username", "like", `%${search.toLowerCase()}%`)
        .orWhere("username", "like", `%${search.toUpperCase()}%`)
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
    }else{
      const data = await db("user")
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

exports.addAdmin = async (req, res) => {
  try {
    await db("user").insert(req.body);
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

exports.EditAdmin = async (req, res) => {
  const {id} = req.params;
  const {username , password ,role} = req.body;
  try {
    await db("user").where('id', id).update({username , password , role});
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

exports.deleteAdmin = async (req, res) => {
  const {id} = req.params;
  try {
    await db("user").where('id', id).del();
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
