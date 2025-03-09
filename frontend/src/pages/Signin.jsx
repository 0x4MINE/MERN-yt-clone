import { useState } from "react";
import useAuth from "../store/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "../libs/firebase";
import { signInWithPopup } from "firebase/auth";
const Signin = () => {
  const { signin, googleAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingin = (e) => {
    e.preventDefault();
    signin({ email, password });
    navigate("/");
  };

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, provider).then((res) => {
        googleAuth({
          name: res.user.displayName,
          email: res.user.email,
          profilePic: res.user.photoURL,
        });
        console.log({
          name: res.user.displayName,
          email: res.user.email,
          profilePic: res.user.photoURL,
        });
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="signin">
        <h1>Signin</h1>
        <button onClick={googleSignin}>Google</button>
      </div>
      <div className="auth-card">
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

        <button onClick={handleSingin}>Signin</button>
        <p>
          Don't have an account?{" "}
          <Link className="link" to={"/signup"}>
            Signup Now!
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signin;
