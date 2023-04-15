import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";



export default function Login() {
  
  const chatbotKey = useRef();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { chatbotKey: chatbotKey.current.value, email: email.current.value, password: password.current.value },
      dispatch
    );
   //  history.push("/updateuser");

  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DevX.Chat</h3>
          <span className="loginDesc">
            Manage all your chatbots with DevX.Chat.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
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
