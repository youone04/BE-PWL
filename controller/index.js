const controllerBuku = require('../controller/manage-buku');
const controllerLogin = require('../controller/login');
const controllerPeminjam = require('../controller/manage-peminjam');
const controllerTransaksi = require('../controller/manage-transaksi');

module.exports = {
    controllerBuku,
    controllerLogin,
    controllerPeminjam,
    controllerTransaksi
  };