import { useState, useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";





export default function Login() {
  

  const clientNr = useRef();
  const gwokuToken = useRef();

  

  const [gwokenEnabledChecked, setgwokenEnabledChecked] = useState(false);
  const [E2EEEnabledChecked, setE2EEEnabledChecked] = useState(false);

  const gwokenEnabled = useRef(false);
  const E2EEEnabled = useRef(false);

  const chatbotKey = useRef();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const defaultClientNr = process.env.REACT_APP_CLIENTNR;
  const defaultGwokuToken = process.env.REACT_APP_GWOKUTOKEN;

  const gwokenEnabledCheckboxChange = (e) => {
    setgwokenEnabledChecked(e.target.checked);
    gwokenEnabled.current.value = e.target.checked;
  };

  const E2EEEnabledCheckboxChange = (e) => {
    setE2EEEnabledChecked(e.target.checked);
    E2EEEnabled.current.value = e.target.checked;
  };

  const handleClick = (e) => {
    e.preventDefault();
    

    loginCall(
    { clientNr: clientNr.current.value, gwokenToken: gwokuToken.current.value, gwokenEnabled:gwokenEnabled.current.value ,E2EEEnabled: E2EEEnabled.current.value, chatbotKey: chatbotKey.current.value, email: email.current.value, password: password.current.value },
      dispatch
    );
   //  history.push("/updateuser");

  };


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Podium Login</h3>
          <span className="loginDesc">
            Podium.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
          <input
              type="password"
              placeholder="Client Number"
              required
              ref={clientNr}
              className="loginInput"
              defaultValue={defaultClientNr}
            />
          <input
              value = {process.env.REACT_APP_GWOKUTOKEN}
              placeholder="Gwoku Token"
              required
              ref={gwokuToken}
              className="loginInput"
              type = "password"
              defaultValue={process.env.REACT_APP_GWOKUTOKEN}
              disabled
            />
           
          <input
              placeholder="Chatbot Key"
              required
              ref={chatbotKey}
              className="loginInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            { false && (
            <div>
            <label className="logincheckboxLabel">
            Gwoken Enabled
              <input
              ref={gwokenEnabled}
              className = "logincheckmark"
              type="checkbox"
              checked={gwokenEnabledChecked}
              onChange={gwokenEnabledCheckboxChange}
              defaultValue={gwokenEnabledChecked}
              />
            </label>
            <label className="logincheckboxLabel">
            E2EE Enabled
              <input
              ref={E2EEEnabled}
              className = "logincheckmark"
              type="checkbox"
              checked={E2EEEnabledChecked}
              onChange={E2EEEnabledCheckboxChange}
              defaultValue={E2EEEnabledChecked}
              />
            </label>
            </div>
            )}
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}
