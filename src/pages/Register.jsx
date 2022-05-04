import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { query, getDocs, where } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = result.user;
      const q = query(
        collection(fireDB, "users"),
        where("uid", "==", user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(fireDB, "users"), {
          uid: user.uid,
          authProvider: "Email",
          email: user.email,
        });
      }
      console.log(result);
      setLoading(false);
      toast.success("Registration successfull !");
      setEmail("");
      setPassword("");
      setCPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Registration fail");
      setLoading(false);
    }
  };

  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_mjlh3hcy.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>SIGN UP</h2>
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
            <input
              type="password"
              className="form-control"
              placeholder="comfirm password"
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
            <div className="register-button">
              <button className="my-3" onClick={register}>
                REGISTER
              </button>
            </div>
            <Link className="resgister-link" to="/login">Click Here To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;