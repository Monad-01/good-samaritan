import React, { useState, useEffect } from "react";
import { CommentCard } from "./CommentCard";
import { useHistory } from "react-router";
import socketIo from "socket.io-client";

export function AnswerCard(props) {
  const socket = socketIo("http://localhost:1337");

  let [comments, setComments] = useState([]);
  let [question_id, setQuestionId] = useState(props.location.state.question_id);
  let [newComment, setNewComment] = useState({
    name: null,
    question_id: null,
    comment: null,
    likes: 0,
    user_id: null,
  });
  let history = useHistory();

  let handleEvent = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:1337/new-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    });
  };

  useEffect(() => {
    console.log("I fetched the comments");
    async function fetchData() {
      let response = await fetch("http://localhost:1337/get-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id: props.location.state.question_id,
        }),
      });
      let { comments } = await response.json();

      if (comments) {
        console.log("This is the comment I found", comments);
        setComments(comments);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    socket.on("new-comment", (payload) => {
      if (payload.question_id == props.location.state.question_id) {
        setComments([...comments, payload]);
      }
    });
  });

  if (comments.length == 0) {
    return (
      <div>
        <li class="write-new">
          <form>
            <center>
              <h1>Be The First To Leave a Response</h1>
              <br />
              <textarea
                placeholder="Write your comment here"
                name="comment"
                class="text-area"
                onChange={(e) =>
                  setNewComment({
                    name: props.location.state.currentUser.name,
                    comment: e.target.value,
                    user_id: 1,
                    question_id: props.location.state.question_id,
                    likes: 0,
                  })
                }
              ></textarea>
              <button onClick={(e) => handleEvent(e)} type="submit">
                Submit
              </button>
            </center>
          </form>
        </li>
      </div>
    );
  } else {
    return (
      <div class="replies-container">
        <center>
          <ul class="comment-section">
            {comments.map((comment) => (
              <CommentCard comment={comment} />
            ))}
            <li class="write-new">
              <form>
                <center>
                  <textarea
                    placeholder="Write your comment here"
                    name="comment"
                    class="text-area"
                    onChange={(e) =>
                      setNewComment({
                        name: props.location.state.currentUser.name,
                        comment: e.target.value,
                        user_id: 1,
                        question_id: props.location.state.question_id,
                        likes: 0,
                      })
                    }
                  ></textarea>
                  <button onClick={(e) => handleEvent(e)} type="submit">
                    Submit
                  </button>
                </center>
              </form>
            </li>
          </ul>
        </center>
      </div>
    );
  }
}
