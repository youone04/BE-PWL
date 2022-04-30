
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('buku').del()
    .then(function () {
      // Inserts seed entries
      return knex('buku').insert([
        {id: 'B0001', nama_buku: 'Kimia',jumlah_buku:2020,admin_id:'P0001'},
        {id: 'B0002', nama_buku:'Bahasa Inggris',jumlah_buku:2021,admin_id:'P0001'},
        {id: 'B0003', nama_buku: 'Matematika',jumlah_buku:2018,admin_id:'P0001'},
        {id: 'B0004', nama_buku: 'Fisika',jumlah_buku:2017,admin_id:'P0001'},
        {id: 'B0005', nama_buku: 'Seni Budaya',jumlah_buku:2018,admin_id:'P0001'},
      ]);
    });
};
