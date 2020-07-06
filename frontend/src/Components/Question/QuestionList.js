import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { QuestionCard } from "./QuestionCard";
import fetchJsonp from "fetch-jsonp";

export function QuestionList(props) {
  let currentUser = props.userInfo;
  let history = useHistory();

  // Holds all nearby questions, and will fetch when componenet mounts
  let [questionList, setQuestionList] = useState([]);
  let [nearbyZipcodes, setZipcodes] = useState([]);
  let [filteredQuestion, setFilteredQuestions] = useState([]);

  console.log(currentUser.location.zipcode);
  useEffect(() => {
    //Fetch Nearby City List First, Then send a Post comparison To Question List To Filter Through it
    fetch(
      `/rest/Ec9xioLAOYwMCKnhtnNISX72z959TVgXiEAGEBwYGwTvrC84LvvtB2Izobk6jOF0/radius.json/${currentUser.location.zipcode}/15/mile`
    )
      .then((resp) => resp.json())
      .then((nearbyCities) =>
        //Grabs nearby zipcodes... can be a lot now we just have to compare to the question list
        setZipcodes(nearbyCities.zip_codes.map((zipcode) => zipcode.zip_code))
      );
  }, []);

  async function filterQuestions() {
    let response = await fetch("http://localhost:1337/questions", {
      credentials: "omit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zipcodes: nearbyZipcodes,
      }),
    });
    let { questions } = await response.json();
    if (questions) {
      console.log("I got the questions");
      setQuestionList(questions);
    } else {
      console.log("No list found");
    }
  }

  if (nearbyZipcodes && questionList.length != 0) {
    return (
      <div>
        <section class="feed-section">
          {questionList.map((question) => (
            <QuestionCard question={question} currentUser={currentUser} />
          ))}
        </section>
      </div>
    );
  } else {
    filterQuestions();
    return (
      <div>
        <h1>Loading Content</h1>
      </div>
    );
  }
}
