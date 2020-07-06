import React, { useState } from "react";
import { useHistory } from "react-router";

export function QuestionForm(props) {
  let history = useHistory();

  let [question, setQuestion] = useState({
    name: null,
    question: null,
    content: null,
    zipcode: null,
    comment_amount: 0,
  });

  let [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("I am submitting");
    let response = await fetch("http://localhost:1337/new-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    history.push("/login");
  }

  return (
    <section class="login-section">
      <div className="login-panel">
        <h1>Post a Question for other Samaritans to View</h1>
        <form onSubmit={handleSubmit}>
          <div class="username-form">
            <label>Name</label>
            <input
              type="text"
              value={question.name}
              onChange={(e) =>
                setQuestion({ ...question, name: e.target.value })
              }
            />
          </div>
          <div class="password-form">
            <label>Zipcode</label>
            <input
              type="text"
              value={question.location}
              onChange={(e) =>
                setQuestion({ ...question, zipcode: e.target.value })
              }
            />
          </div>
          <div class="password-form">
            <label>Question</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                setQuestion({ ...question, question: e.target.value })
              }
            />
          </div>
          <div class="password-form">
            <label>Other information</label>
            <textarea
              type="text"
              value={question.content}
              onChange={(e) =>
                setQuestion({ ...question, content: e.target.value })
              }
            ></textarea>
          </div>
          <button type="submit" value="Sign Up">
            Ask Question
          </button>
        </form>
      </div>
    </section>
  );
}
