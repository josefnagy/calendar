import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../actions";
import { validateEmail, validatePassword } from "../js/validate";

import InputBox from "./InputBox.jsx";

const Signup = ({ createUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const handleSignup = () => {
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));

    if (password !== passwordConfirm)
      setPasswordConfirmError("Hesla se musí shodovat");
    else setPasswordConfirmError("");

    if (
      !emailError &&
      !passwordError &&
      !passwordConfirmError &&
      email &&
      password &&
      passwordConfirm
    )
      createUser(email, password);
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
