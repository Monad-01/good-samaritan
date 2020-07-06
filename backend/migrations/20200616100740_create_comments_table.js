exports.up = function (knex) {
  return knex.schema.createTable("comments", function (t) {
    t.increments();
    t.string("comment");
    t.integer("user_id");
    t.string("name");
    t.integer("question_id");
    t.integer("likes");
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
