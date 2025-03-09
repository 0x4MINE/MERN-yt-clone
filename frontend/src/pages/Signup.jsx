import { useState } from "react";
import useAuth from "../store/useAuth";
import { Link } from "react-router-dom";
const Signup = () => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSingUp = (e) => {
    e.preventDefault();

    signup({ name, email, password });
  };

  return (
    <div className="auth-container">
      
      <div className="auth-card">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Channel Name"
          type="text"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
        />
        <button onClick={handleSingUp}>SignUp</button>
        <p>Already have an account? <Link className="link" to={'/signin'}>Signin here!</Link></p>

      </div>
      <div className="signin">
        <h1>SignUp</h1>
      </div>
    </div>
  );
};

export default Signup;
