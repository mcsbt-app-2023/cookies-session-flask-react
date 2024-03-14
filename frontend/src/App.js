import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logUserIn = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
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

  const logUserOut = () => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json.message);
        setLoggedIn(false);
      })
      .catch((err) => console.error(err));
  };

  const isUserLoggedIn = () => {
    fetch("http://localhost:8080/is_logged_in", {
      credentials: "include",
    })
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
            log in
          </button>
        )}
        {loggedIn && (
          <>
            <p>Welcome {username}!</p>
            <button className="App-link" onClick={logUserOut}>
              log out
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
