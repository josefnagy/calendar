import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import { createUser, cleanError, setError } from "../actions";
import { validateEmail, validatePassword } from "../js/validate";
import InputBox from "./InputBox.jsx";

const Signup = ({ createUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      dispatch(cleanError());
      setIsLoading(true);

      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);

      if (isEmailValid !== "") {
        dispatch(setError(isEmailValid));
      } else if (isPasswordValid !== "") {
        dispatch(setError(isPasswordValid));
      } else if (password !== passwordConfirm)
        dispatch(setError("Hesla se musí shodovat"));
      else if (!isLoading) {
        await createUser(email, password);
      }
    } catch {
      console.log("somethings wrong");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__card">
            <div className="signup__title">
              <h2>Registrace</h2>
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
