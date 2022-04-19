exports.up = function(knex) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    .createTable('buku' , (table) => {
        table.string('id').primary();
        table.string('nama_buku').notNullable();
        table.integer('jumlah_buku').notNullable();
        table.boolean('publish').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('admin_id').references('id').inTable('user').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('buku')
};