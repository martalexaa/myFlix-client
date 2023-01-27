import {useState} from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDeafult();

        const data = {
            access: username, 
            secret: password
        };

//call the onLoggedIn prop when the login request succeeds
    fetch("https://martalexa-myflix.onrender.com/login", {
        method: "POST",
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            onLoggedIn(username);
        } else {
            alert("Login failed")
        }
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
          minLength="4"
          maxLength="8"
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
