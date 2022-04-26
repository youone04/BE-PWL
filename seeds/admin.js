
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 'P0001', username: 'admin',password:'admin',role:'admin'}
      ]);
    });
};
