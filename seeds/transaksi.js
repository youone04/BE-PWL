
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('transaksi').del()
    .then(function () {
      // Inserts seed entries
      return knex('transaksi').insert([
        {id: 'T0001', peminjam_id: 'A0001',buku_id:'B0001',start:'2022-04-17',end:'2022-04-21',admin_id:'P0001'},
        {id: 'T0002', peminjam_id: 'A0002',buku_id:'B0002',start:'2022-04-27',end:'2022-04-30',admin_id:'P0001'},
        {id: 'T0003', peminjam_id: 'A0003',buku_id:'B0003',start:'2022-04-15',end:'2022-04-19',admin_id:'P0001'},
        {id: 'T0004', peminjam_id: 'A0004',buku_id:'B0004',start:'2022-04-14',end:'2022-04-19',admin_id:'P0001'},
        {id: 'T0005', peminjam_id: 'A0005',buku_id:'B0005',start:'2022-04-26',end:'2022-04-29',admin_id:'P0001'}
      ]);
    });
};
