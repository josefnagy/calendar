import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import InputBox from "./InputBox.jsx";
import { login, setError, cleanError } from "../actions/index.js";
import { validateEmail, validatePassword } from "../js/validate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(cleanError());
    setIsLoading(true);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid !== "") {
      dispatch(setError(isEmailValid));
    } else if (isPasswordValid !== "") {
      dispatch(setError(isPasswordValid));
    } else if (!isLoading) {
      dispatch(login(email, password));
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__card">
            <div className="signup__title">
              <h2>Přihlásit se</h2>
            </div>
            <div className="signup__error-msg">{error}</div>
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

export default Login;
