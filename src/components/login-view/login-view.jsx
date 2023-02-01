import React from "react";
import {useState} from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

        const handleSubmit = (event) => {event.preventDefault(); // prevent reloading the entire page
        const data = { Username: username, Password: password };

        fetch("https://martalexa-myflix.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data) // response with JSON object
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user)); // put user and token in local storage to stay logged in
              localStorage.setItem("token", data.token);
              onLoggedIn(data.user, data.token);  //send user and token to mainview
            } else {
              alert("No such user");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
          });
        };

        return (
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      };