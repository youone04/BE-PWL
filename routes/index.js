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
router.put('/buku/:id', controller.controllerBuku.editBuku);
router.delete('/buku/:id', controller.controllerBuku.deleteBuku);
// peminjam buku
router.get('/peminjam', controller.controllerPeminjam.getPeminjam);
router.post('/peminjam', controller.controllerPeminjam.addPeminjam);
router.put('/peminjam/:id', controller.controllerPeminjam.updatePeminjam);
router.delete('/peminjam/:id', controller.controllerPeminjam.deletePeminjam);
module.exports = { router };