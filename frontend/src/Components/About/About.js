import React from "react";
import { useHistory } from "react-router";

export function About(props) {
  //this is a test
  return (
    <section class="about">
      <div class="about-img">
        <img src="https://cdn.pixabay.com/photo/2018/08/19/15/29/window-3616886_1280.jpg" />
      </div>

      <p class="about-content">
        <h1>About The App :</h1>
        <br />
        Good Samaritan is a Q/A application where user's are able to help out
        nearby travellers, by answering any questions that are nearby their
        location.
        <br />
        <br />
        Traveller's around the world are able to post any question, they may
        have stumbled upon within their journey. And it is up to Good Samaritans
        like you and I to support them and answer their questions along the way.
      </p>
    </section>
  );
}
