import { useState, useRef } from 'react';


const LoginForm = (() => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');



  
  const handleFormSubmit = (e) => {
  
  }


  return (
    <form onSubmit={handleFormSubmit}>
    <input
      value={username}
      name="username"
      // onChange={handleInputChange}
      // onBlur={handleBlur}
      type="text"
      placeholder="username"
      required
    />
    <label htmlFor="username">{usernameMessage}</label><br></br>
    <input
      value={password}
      name="password"
      // onChange={handleInputChange}
      // onBlur={handleBlur}
      type="password"
      placeholder="password"
      required
    />
    <label htmlFor="password">{passwordMessage}</label><br></br>
    <button className="submit-btn" type="submit">
      Submit
    </button>
  </form>
  )
})





function LoginPage() {
  return (
    <>
      <h1>This is a Login Page</h1>
    </>
  );
}

export default LoginPage;
