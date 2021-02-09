import React, { useState } from "react";
import InputBox from "./InputBox.jsx";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__card">
            <div className="signup__title">
              <h2>Registrace</h2>
            </div>
            <InputBox
              label="Email:"
              type="text"
              value={email}
              setValue={setEmail}
              id="email"
            />
            <InputBox
              label="Heslo:"
              type="password"
              value={password}
              setValue={setPassword}
              id="password"
            />
            <InputBox
              label="Potvrdit heslo:"
              type="password"
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              id="passwordConfirm"
            />
            <button className="signup__button">Zaregistrovat se</button>
          </div>
          <div className="signup__footer">
            <span>Už máš účet?</span>
            <Link to="/" className="signup__link">
              Přihlásit se{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
