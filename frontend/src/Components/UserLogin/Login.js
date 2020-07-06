import React, { useState } from "react";
import { useHistory } from "react-router";

export function Login(props) {
  let history = useHistory();

  let [user, setUser] = useState({
    name: null,
    password: null,
  });

  let [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("I am submitting");
    let response = await fetch("http://localhost:1337/authenticate", {
      credentials: "omit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        email: user.email,
      }),
    });
    let { success, id, name } = await response.json();
    if (success) {
      console.log("Login Successful");
      props.getUserInfo(id, name);
      //HONESTLY CAN JUST RERENDER TO ANY OTHER PAGE THIS JUST MAKES MORE SENSE
      //UNTIL USER PAGE IS CREATED
      history.push("/enter-location");
    } else {
      console.log("Login Failed");
      alert("Unsuccessful Login");
    }
  }

  return (
    <section class="login-section">
      <div className="login-panel">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div class="username-form">
            <label>Username</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div class="password-form">
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button type="submit" value="Sign Up">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
