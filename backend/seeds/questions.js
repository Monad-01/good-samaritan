exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("questions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("questions").insert([
        {
          question: "Can you see this?",
          content: "You should be able to see this question",
          zipcode: "77481",
          comment_amount: 0,
          name: "Tim",
        },
        {
          question: "Can you not see this?",
          content: "You shouldn't be able to see this question",
          zipcode: "10001",
          comment_amount: 0,
          name: "Reginald",
        },
      ]);
    });
};
