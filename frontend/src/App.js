import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logUserIn = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "pepe", password: "pepe" }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.logged_in) {
          setLoggedIn(true);
          setUsername(json.username);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const isUserLoggedIn = () => {
    fetch("http://localhost:8080/is_logged_in")
      .then((data) => data.json())
      .then((json) => {
        if (json.logged_in) {
          setLoggedIn(true);
          setUsername(json.username);
        } else {
          setLoggedIn(false);
        }
      });
  };

  useEffect(isUserLoggedIn);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {!loggedIn && (
          <button className="App-link" onClick={logUserIn}>
            log user in!
          </button>
        )}
        {loggedIn && <p>Welcome {username}!</p>}
      </header>
    </div>
  );
}

export default App;
