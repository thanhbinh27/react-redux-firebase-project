import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));

      const user = result.user;
      const q = query(
        collection(fireDB, "users"),
        where("uid", "==", user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(fireDB, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "Email",
          email: user.email,
        });
      }

      setLoading(false);
      toast.success("Login successfull !");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login fail");
      setLoading(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const q = query(
        collection(fireDB, "users"),
        where("uid", "==", user.uid)
      );
      localStorage.setItem("currentUser", JSON.stringify(result));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(fireDB, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "Google",
          email: user.email,
        });
      }
      toast.success("Login successfull !");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>SIGN IN</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="login-button">
              <button className="my-3" onClick={login}>
                LOGIN
              </button>
              <button onClick={signInWithGoogle}>
                {" "}
                <FcGoogle className="FcGoogle" />
                LOGIN WITH GOOGLE
              </button>
            </div>

            <Link className="resgister-link" to="/register">
              Click Here To Register
            </Link>
          </div>
        </div>
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom"></div>
    </div>
  );
}

export default Login;
