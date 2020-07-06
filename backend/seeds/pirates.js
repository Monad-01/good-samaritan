
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pirates').del()
    .then(function () {
      // Inserts seed entries
      return knex('pirates').insert([
        {id: 1, name: 'Whitebeard'},
        {id: 2, name: 'Blackbeard'},
        {id: 3, name: 'Greybeard'}
      ]);
    });
};
