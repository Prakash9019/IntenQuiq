import { auth, googleProvider } from "./config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("Logged in  SuccessFully");
      navigate("/homepage");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast("Logged in  SuccessFully");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast("Logged Out Successfully");
    } catch (err) {
      console.error(err);
    }
  };
//style={{backgroundColor:"blue",  justifyContent:"center" , alignItems:"center" ,padding:"150px" ,margin: "200px"}}
  return (
    <div className="container">
  <div className="form-container">
    <input
      className="input"
      placeholder="Email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <br/>
    <br/>
    <input
      className="input"
      placeholder="Password..."
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <br/>  
    <br/>
    <button onClick={signIn}> Sign In</button>
    <br/>  
    <br/>
    <button onClick={signInWithGoogle}> Sign In With Google</button>
    <br/>  
    <br/>
    <button onClick={logout}>  Logout </button>
  </div>
</div>

  );
};

export default Login;