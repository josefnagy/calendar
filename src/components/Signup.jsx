import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../actions";

import InputBox from "./InputBox.jsx";

const Signup = ({ createUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const handleSignup = () => {
    if (validateEmail(email)) {
      if (validatePassword(password, passwordConfirm)) {
        console.log("good");
      }
    } else {
      console.log("baad");
    }

    // createUser(email, password);
  };

  const validateEmail = (userEmail) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userEmail.match(mailformat)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Email je ve špatném formátu.");
      return false;
    }
  };

  const validatePassword = (password, passwordConfirm) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.match(passwordRegex)) {
      setPasswordError("");
      if (password === passwordConfirm) {
        setPasswordConfirmError("");
        return true;
      } else {
        setPasswordConfirmError("Hesla se neshodují.");
        return false;
      }
    } else {
      setPasswordError(
        "Heslo musí mít alspoň 6 znaků, jedno malé a velké písmeno a číslo."
      );
      return false;
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
              error={emailError}
            />
            <InputBox
              label="Heslo"
              type="password"
              value={password}
              setValue={setPassword}
              id="password"
              error={passwordError}
            />
            <InputBox
              label="Potvrdit heslo"
              type="password"
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              id="passwordConfirm"
              error={passwordConfirmError}
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
