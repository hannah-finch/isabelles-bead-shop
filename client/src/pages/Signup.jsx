import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
    // use state to save form data
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    const [usernameMessage, setUsernameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

    const [addUser] = useMutation(ADD_USER);
    
    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        // set the state based on input type    
        switch (inputType) {
            case "username":
                setUsername(inputValue);
                break;
            case "email":
                setEmail(inputValue);
                break;
            case "password":
                setPassword(inputValue);
                break;
            case "passwordConfirm":
                setPasswordConfirm(inputValue);
                break;
            default:
                break;
        }
    };

    const handleBlur = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        // set the state based on input type
        switch (inputType) {
            case "username":
                inputValue === ""
                    ? setUsernameMessage("Username is required")
                    : setUsernameMessage("");
                break;
            case "email":
                inputValue === ""
                    ? setEmailMessage("Email is required")
                    : setEmailMessage("");
                break;
            case "password":
                inputValue === ""
                    ? setPasswordMessage("Password is required")
                    : setPasswordMessage("");
                break;
            case "passwordConfirm":
                inputValue === ""
                    ? setPasswordConfirmMessage("Password confirmation is required")
                    : setPasswordConfirmMessage("");
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            console.error("Passwords do not match");
            return false;
        }

        try {
            const { data } = await addUser({
                variables: { username, email, password },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        }catch (err) {
            console.error(err);
        }
        // AFTER signing up, alert user and reset state
                alert(`Welcome, ${username}!`);
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        // TODO: redirect to home or wherever
    };

    return (
        <form onSubmit={handleFormSubmit}>
            
            <input
                value={username}
                name="username"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text"
                placeholder="username"
                required
            />
            <label htmlFor="username">{usernameMessage}</label>
            <br />

            <input
                value={email}
                name="email"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="email"
                placeholder="email"
                required
            />
            <label htmlFor="email">{emailMessage}</label>
            <br />

            <input
                value={password}
                name="password"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="password"
                placeholder="password"
                required
            />
            <label htmlFor="password">{passwordMessage}</label>
            <br />

            <input
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="password"
                placeholder="confirm password"
                required
            />
            <label htmlFor="passwordConfirm">{passwordConfirmMessage}</label>
            <br />
                
            <button className="submit-btn" type="submit">
                Submit
            </button>

        </form>
    );
};

function SignupPage() {
    return (
        <>
            <h1>This is a Signup Page</h1>
            <SignupForm />
        </>    
    );
}

export default SignupPage;