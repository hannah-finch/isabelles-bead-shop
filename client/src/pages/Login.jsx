import { useState } from "react";
import SignupForm from "../components/forms/SignupForm";
import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const LoginFooter = () => {
    return (
      <div className="form-footer narrow center">
        <button onClick={handleClick}>
          No account? <span className="underline bold">Sign up</span>
        </button>
      </div>
    );
  };

  const SignupFooter = () => {
    return (
      <div className="form-footer narrow center">
        <button onClick={handleClick}>
          Already signed up? <span className="underline bold">Log in</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <section>
        {showForm ? (
          <>
            <LoginForm /> <LoginFooter />
          </>
        ) : (
          <>
            <SignupForm /> <SignupFooter />
          </>
        )}
      </section>
    </>
  );
}

export default LoginPage;
