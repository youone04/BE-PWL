const express = require("express");
const verifikasi = require('../middleware/auth');
let router = express.Router();
const controller = require('../controller');

// auth
router.post("/login", controller.controllerLogin.login);
router.get("/auth",verifikasi(),controller.controllerLogin.auth);
// manage buku
router.get('/buku', controller.controllerBuku.getBuku);
router.post('/buku', controller.controllerBuku.addBuku);
router.put('/buku', controller.controllerBuku.editBuku);
router.delete('/buku/:id', controller.controllerBuku.deleteBuku);


module.exports = { router };