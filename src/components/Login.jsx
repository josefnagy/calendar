import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InputBox from "./InputBox.jsx";
import { login } from "../actions/index.js";
import { validateEmail, validatePassword } from "../js/validate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setEmailError(validateEmail);
    setPasswordError(validatePassword(password));

    if (!emailError && !passwordError && email && password && !isLoading) {
      setIsLoading(true);
      login(email, password);
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__card">
            <div className="signup__title">
              <h2>Přihlásit se</h2>
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
            <button className="signup__button" onClick={() => handleLogin()}>
              Přihlásit
            </button>
          </div>
          <div className="signup__footer">
            <span>Jestě nemáš účet?</span>
            <Link to="/signup" className="signup__link">
              Zaregistrovat se
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {})(Login);
