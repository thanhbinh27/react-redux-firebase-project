import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));
      setLoading(false);
      toast.success("Login successfull !");
      window.location.href = "/admin";
    } catch (error) {
      console.log(error);
      toast.error("Login fail");
      setLoading(false);
    }
  };

  return (
    <div className="login-parent-admin">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form-admin">
            <h2 className="text-center">ADMINISTRATOR</h2>
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
            <div className="button-login-admin">
              <button className="my-3" onClick={login}>
                LOGIN
              </button>
            </div>
            <Link className="to-login" to="/login">
              Click Here To Login User
            </Link>
          </div>
        </div>
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_R4riCH.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom-admin"></div>
    </div>
  );
}

export default LoginAdmin;
