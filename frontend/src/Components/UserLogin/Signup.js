import React, { useState } from "react";
import { useHistory } from "react-router";

export function Signup(props) {
  let history = useHistory();

  let [newUser, setNewUser] = useState({
    name: null,
    password: null,
    email: null,
  });

  let handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name == null || newUser.name == "" || newUser.name == " ") {
      alert("Username cannot be empty");
    } else if (
      newUser.password == null ||
      newUser.password == "" ||
      newUser.password == " "
    ) {
      alert("Password cannot be empty");
    } else if (
      newUser.email == null ||
      newUser.email == "" ||
      newUser.email == " "
    ) {
      alert("Email cannot be empty");
    } else {
      console.log("I submitted");

      fetch("http://localhost:1337/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      history.push("/login");
    }
  };

  return (
    <section class="login-section">
      <div className="login-panel">
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
          <div class="username-form">
            <label>Username</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div class="password-form">
            <label>Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <div class="email-form">
            <label> Email </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <button type="submit" value="Sign Up">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
