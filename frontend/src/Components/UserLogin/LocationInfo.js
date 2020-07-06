import React, { useState } from "react";
import { useHistory } from "react-router";

export function LocationInfo(props) {
  let [location, setLocation] = useState({
    zipcode: null,
  });

  let history = useHistory();

  let handleSubmit = (e) => {
    // Validate if it is a valid location!
    props.setLocation(location);
    history.push("/help-a-traveller");
  };

  return (
    <section class="login-section">
      <div class="login-panel">
        <h1>Enter your current location's zipcode</h1>
        <div class="location-form">
          <input
            type="text"
            onChange={(e) =>
              setLocation({ ...location, zipcode: e.target.value })
            }
          ></input>
        </div>
        <button
          type="button"
          value="Submit Location"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
