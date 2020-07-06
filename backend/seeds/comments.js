exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          comment: "Can you see this? I really hope you can see this",
          likes: 2,
          question_id: 32,
          user_id: 1,
          name: "Gerald",
        },
      ]);
    });
};
