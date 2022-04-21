exports.up = function(knex) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    .createTable('peminjam' , (table) => {
        table.string('id').primary();
        table.string('nama_peminjam').notNullable();
        table.string('jk').notNullable();
        table.string('alamat').defaultTo(false);
        table.string('hp').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('admin_id').references('id').inTable('user').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('peminjam')
};