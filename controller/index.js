const controllerBuku = require('../controller/manage-buku');
const controllerLogin = require('../controller/login');
const controllerPeminjam = require('../controller/manage-peminjam');
const controllerTransaksi = require('../controller/manage-transaksi');
const controllerLog = require('../controller/manage-log');

module.exports = {
    controllerBuku,
    controllerLogin,
    controllerPeminjam,
    controllerTransaksi,
    controllerLog
  };