import React from "react";
import { useHistory } from "react-router";

export function QuestionCard(props) {
  let history = useHistory();

  let handleEvent = (e) => {
    history.push("/replies", {
      question_id: props.question.id,
      currentUser: props.currentUser,
    });
  };

  return (
    <div class="Card-Container">
      <div onClick={(e) => handleEvent(e)} class="blog-card spring-fever">
        <div class="title-content">
          <h3>{props.question.question}</h3>
          <hr />
          <div class="intro">
            <img
              src="https://img.icons8.com/material/50/000000/letter-from-hospital.png"
              onMouseOver="this.src='https://img.icons8.com/material/100/000000/letter-from-hospital.png;"
            />
          </div>
        </div>
        <div class="card-info">{props.question.content}</div>
        <div class="utility-info">
          <ul class="utility-list">
            <center>
              <li class="date">6.18.2020</li>
            </center>
          </ul>
        </div>
        <div class="gradient-overlay"></div>
        <div class="color-overlay"></div>
      </div>
    </div>
  );
}
