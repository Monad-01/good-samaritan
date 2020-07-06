import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import socketIo from "socket.io-client";
// import "./App.css";
import "./Main.css";
import { Signup } from "./Components/UserLogin/Signup";
import { Login } from "./Components/UserLogin/Login";
import { LocationInfo } from "./Components/UserLogin/LocationInfo";
import { QuestionList } from "./Components/Question/QuestionList";
import { Header } from "./Components/Nav/Header";
import { About } from "./Components/About/About";
import { AnswerCard } from "./Components/Question/AnswerCard";
import { LoggedInHeader } from "./Components/Nav/LoggedHeader";
import { QuestionForm } from "./Components/Question/QuestionForm";

const socket = socketIo("http://localhost:1337");

function App() {
  let [currentUser, setCurrentUser] = useState({
    id: null,
    name: null,
    location: null,
  });

  let [isAuthenticated, setAuthentication] = useState(null);

  let getUserInfo = (id, username) => {
    console.log("I saved the user's info");

    setCurrentUser({
      ...currentUser,
      id: id,
      name: username,
    });

    setAuthentication(true);
  };

  let setLocation = (location) => {
    console.log("I am submitting this zipcode, ", location);

    setCurrentUser({
      ...currentUser,
      location: location,
    });
  };

  return (
    <div classname="App">
      <BrowserRouter>
        {currentUser.id ? (
          <LoggedInHeader name={currentUser.name} />
        ) : (
          <Header />
        )}
        <div classname="container">
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/replies" component={AnswerCard} />
          <Route
            exact
            path="/new-question"
            render={(props) => (
              <QuestionForm {...props} userInfo={currentUser} />
            )}
          />
          <Route
            exact
            path="/help-a-traveller"
            render={(props) => (
              <QuestionList {...props} userInfo={currentUser} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} getUserInfo={getUserInfo} />}
          />
          <Route
            exact
            path="/enter-location"
            render={(props) => (
              <LocationInfo {...props} setLocation={setLocation} />
            )}
          />
          <Route exact path="/" component={About} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

///////////
// let [piratesList,setPiratesList] = useState([])
// let [newPirate, setNewPirate] = useState({
//   name: null
// })

// useEffect(() => {
//   fetch('http://localhost:1337/pirates')
//   .then( resp => resp.json())
//   .then( pirates => setPiratesList([...piratesList, ...pirates]))

// },[])

// useEffect(() => {
//   socket.on('new-pirate', payload => {
//     setPiratesList([...piratesList, payload])
//   })
// })

// let handleSubmit = () => {
//   console.log('I submitted', newPirate)

//   fetch('http://localhost:1337/pirates', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newPirate)
//   })

// }

// console.log(piratesList)

// if (piratesList == null){
//   return <h1>Loading Pirates</h1>
// }
// else{

//   return (
//     <div>
//       <h1>Arrggg Matey</h1>

//       <ul>
//         {piratesList.map(pirate =>
//         <li>{pirate.name}</li>
//         )}
//       </ul>

//       <input type = 'text' onChange={(e)=> setNewPirate({name: e.target.value})}></input>
//       <input type = 'submit' value = "Add New Pirate" onClick={() => handleSubmit()}></input>

//     </div>
//   );
