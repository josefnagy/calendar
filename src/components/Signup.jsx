import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../actions";

import InputBox from "./InputBox.jsx";

const Signup = ({ createUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    console.log(email);
    if (validateEmail(email)) {
      console.log("good");
    } else {
      console.log("baad");
    }

    // createUser(email, password);
  };

  const validateEmail = (userEmail) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userEmail.match(mailformat)) return true;
    else return false;
  };

  const validatePassword = (password, passwordConfirm) => {
    if (password.length < 6) {
      // TODO ......
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__card">
            <div className="signup__title">
              <h2>Registrace</h2>
            </div>
            <InputBox
              label="Email"
              type="text"
              value={email}
              setValue={setEmail}
              id="email"
            />
            <InputBox
              label="Heslo"
              type="password"
              value={password}
              setValue={setPassword}
              id="password"
            />
            <InputBox
              label="Potvrdit heslo"
              type="password"
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              id="passwordConfirm"
            />
            <button className="signup__button" onClick={() => handleSignup()}>
              Zaregistrovat se
            </button>
          </div>
          <div className="signup__footer">
            <span>Už máš účet?</span>
            <Link to="/login" className="signup__link">
              Přihlásit se
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { createUser })(Signup);
