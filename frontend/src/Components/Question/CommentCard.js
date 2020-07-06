import React from "react";
import { useHistory } from "react-router";

export function CommentCard(props) {
  console.log("This is the props I passed", props.question_id);
  return (
    <li class="comment user-comment">
      <div class="info">
        <a>{props.comment.name} replied:</a>
        <div></div>
      </div>
      <br />
      <p>{props.comment.comment}</p>
    </li>
  );
}
