import React from "react";
import { useHistory } from "react-router";

export function Header(props) {
  let history = useHistory();

  return (
    <nav class="main-head">
      <div>
        <img src="https://img.icons8.com/ios-glyphs/64/000000/hand-planting-1.png" />
      </div>
      <h1>Good Samaritan</h1>
      <ul>
        <li>
          <a onClick={() => history.push("/new-question")} href="">
            Ask A Question
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/login")} href="">
            Login
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/signup")} href="">
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}
