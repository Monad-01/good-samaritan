exports.up = function (knex) {
  return knex.schema.createTable("questions", function (t) {
    t.increments();
    t.string("question");
    t.integer("comment_amount");
    t.string("content");
    t.string("zipcode");
    t.string("name");
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("questions");
};
