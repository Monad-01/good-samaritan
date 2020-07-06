
exports.up = function(knex) {
    return knex.schema.createTable('users', function(t) {
        t.increments()
        t.string('name')
        t.string('email')
        t.string('hashedPassword')
        t.timestamps()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
