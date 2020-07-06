import React from "react";
import { useHistory } from "react-router";

export function LoggedInHeader(props) {
  let history = useHistory();

  return (
    <nav class="main-head">
      <div>
        <img src="https://img.icons8.com/ios-glyphs/64/000000/hand-planting-1.png" />
      </div>
      <h1>Good Samaritan</h1>
      <ul>
        <li>
          <a onClick={() => history.push("/")} href="#About">
            About
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/help-a-traveller")} href="#Feed">
            Feed
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/new-question")} href="">
            Post a Question
          </a>
        </li>
        <li>
          <a>Welcome {props.name}</a>
        </li>
      </ul>
    </nav>
  );
}
