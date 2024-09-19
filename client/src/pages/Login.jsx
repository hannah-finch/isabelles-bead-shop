// Login is temporarily saving username and password with state, send that to back end on form submit

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
const LoginForm = () => {
  // use state to save login input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // set the state based on input type
    if (inputType === "username") {
      setUsername(inputValue);
    }
    if (inputType === "password") {
      setPassword(inputValue);
    }
  };

  const handleBlur = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "username") {
      inputValue === ""
        ? setUsernameMessage("Username is required")
        : setUsernameMessage("");
    }
    if (inputType === "password") {
      inputValue === ""
        ? setPasswordMessage("Password is required")
        : setPasswordMessage("");
    }
  };

  // TODO: Write logic for form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { username, password },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }
    // AFTER logging in, alert user and reset state
    alert(`Welcome, ${username}!`);
    setUsername("");
    setPassword("");
    // TODO: redirect to home or wherever
  };

  return (
    <form onSubmit={handleFormSubmit} className="narrow">
      <h2>Log in</h2>
      <input
        value={username}
        name="username"
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="text"
        placeholder="username"
        required
      />
      <p>{usernameMessage}</p>

      <input
        value={password}
        name="password"
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="password"
        placeholder="password"
        required
      />
      <p>{passwordMessage}</p>

      <button className="btn-1" type="submit">
        Submit
      </button>

      <div className="form-footer">
        <Link to="/signup">
          No account? <span className="underline bold">Sign up</span>
        </Link>
      </div>
    </form>
  );
};

function LoginPage() {
  return (
    <>
      <section>
        <LoginForm />
      </section>
    </>
  );
}

export default LoginPage;
