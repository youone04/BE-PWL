const controllerBuku = require('../controller/manage-buku');
const controllerLogin = require('../controller/login');
const controllerPeminjam = require('../controller/manage-peminjam');
const controllerTransaksi = require('../controller/manage-transaksi');
const controllerLog = require('../controller/manage-log');
const controllerDashboard = require('../controller/dashboard');
const controllerAdmin = require('../controller/manage-admin');
const controllerDenda = require('../controller/laporan')

module.exports = {
    controllerBuku,
    controllerLogin,
    controllerPeminjam,
    controllerTransaksi,
    controllerLog,
    controllerDashboard,
    controllerAdmin,
    controllerDenda
  };