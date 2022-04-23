exports.up = function(knex) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    .createTable('transaksi' , (table) => {
        table.string('id').primary();
        table.string('peminjam_id').references('id').inTable('peminjam').onDelete('CASCADE');
        table.string('buku_id').references('id').inTable('buku').onDelete('CASCADE');
        table.datetime('start').notNullable();
        table.datetime('end').notNullable();
        table.boolean('pengembalian').defaultTo(false);
        table.integer('denda');
        table.integer('jumlah_perpanjang').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('admin_id').references('id').inTable('user').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('transaksi')
};