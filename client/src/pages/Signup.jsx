import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
    const [formState, setFormState] = useState({    username: "",
                                                    email: "",
                                                    password: "",
                                                    passwordConfirm: "",
                                                    usernameMessage: "",
                                                    emailMessage: "",
                                                    passwordMessage: "",
                                                    passwordConfirmMessage: ""
                                              });

    const [addUser] = useMutation(ADD_USER);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        
        const validationMessages = {
            username: "Username is required",
            email: "Email is required",
            password: "Password is required",
            passwordConfirm: "Password confirmation is required"
        };

        // set the appropriate message
        setFormState({
            ...formState,
            [`${name}Message`]: value === "" ? validationMessages[name] : ""
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        const { username, password, passwordConfirm } = formState;

        if (password !== passwordConfirm) {
            console.error("Passwords do not match");
            return false;
        }

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            Auth.login(data.addUser.token);
        }catch (err) {
            console.error(err);
        }

        // AFTER signing up, alert user and reset state
        alert(`Welcome, ${username}!`);
        setFormState({
            username: "",
            email: "",
            password: "",
            passwordConfirm: ""
        });
        // TODO: redirect to home or wherever
    };

    return (
        <form onSubmit={handleFormSubmit}>
            
            <input
                value={formState.username}
                name="username"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text"
                placeholder="username"
                required
            />
            <label htmlFor="username">{formState.usernameMessage}</label>
            <br />

            <input
                value={formState.email}
                name="email"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="email"
                placeholder="email"
                required
            />
            <label htmlFor="email">{formState.emailMessage}</label>
            <br />

            <input
                value={formState.password}
                name="password"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="password"
                placeholder="password"
                required
            />
            <label htmlFor="password">{formState.passwordMessage}</label>
            <br />

            <input
                value={formState.passwordConfirm}
                name="passwordConfirm"
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="password"
                placeholder="confirm password"
                required
            />
            <label htmlFor="passwordConfirm">{formState.passwordConfirmMessage}</label>
            <br />
                
            <button className="submit-btn" type="submit">
                Submit
            </button>
            <br />

            <Link to="/login">Already signed up?</Link>

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