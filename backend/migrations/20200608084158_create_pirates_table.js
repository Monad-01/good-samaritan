
exports.up = function(knex) {
  return knex.schema.createTable('pirates', function(t) {
    t.increments();
    t.string('name');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pirates')
};
