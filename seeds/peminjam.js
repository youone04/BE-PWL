
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('peminjam').del()
    .then(function () {
      // Inserts seed entries
      return knex('peminjam').insert([
        {id: 'A0001', nama_peminjam: 'Yudi Gunawan',jk:'laki-laki',alamat:'itali',hp:'09837646563',admin_id:'P0001'},
        {id: 'A0002', nama_peminjam: 'Tasya',jk:'perempuan',alamat:'sumanda',hp:'07837646563',admin_id:'P0001'},
        {id: 'A0003', nama_peminjam: 'Ratu',jk:'perempuan',alamat:'Jerman',hp:'08397646563',admin_id:'P0001'},
        {id: 'A0004', nama_peminjam: 'Yahya',jk:'laki-laki',alamat:'England',hp:'085837646563',admin_id:'P0001'},
        {id: 'A0005', nama_peminjam: 'Bunga',jk:'perempuan',alamat:'Swis',hp:'09837646563',admin_id:'P0001'}
      ]);
    });
};
