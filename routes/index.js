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
// manage transaksi
router.get('/transaksi', controller.controllerTransaksi.getTransaksi);
router.post('/transaksi', controller.controllerTransaksi.addTransaksi);
router.put('/transaksi/:id', controller.controllerTransaksi.pengembalian);
router.put('/perpanjang/:id', controller.controllerTransaksi.perpanjangan);
//manage log
router.get('/log-peminjaman', controller.controllerLog.logPeminjaman);
router.get('/log-pengembalian', controller.controllerLog.logPengembalian);
// dashboard
router.get('/dashboard', controller.controllerDashboard.dashboard);
//admin
router.get('/admin', controller.controllerAdmin.admin);
router.post('/admin', controller.controllerAdmin.addAdmin);
router.put('/admin/:id', controller.controllerAdmin.EditAdmin);
router.delete('/admin/:id', controller.controllerAdmin.deleteAdmin);


module.exports = { router };