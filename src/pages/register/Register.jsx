import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const formRef = useRef(null);

  const chatbotKey = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        clientNr: clientNr,
        gwoken:gwokuToken,
        chatbotKey: chatbotKey.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/auth/register", user);
        alert("User has been registered");
        formRef.current.reset(); // clear the form fields
        history.push("/register");
      } catch (err) {
        alert(err.response.data)
        }
    }
  };

  return (
    
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GWOCU Chat</h3>
          <span className="loginDesc">
            Register all your users in one place.
          </span>
        </div>
        <div className="loginRight">
          <form ref={formRef} className="loginBox" onSubmit={handleClick}>
          <input
              placeholder="Chatbot Key"
              required
              ref={chatbotKey}
              className="loginInput"
            />
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Register
            </button>
            <button className="loginRegisterButton"  onClick={() => history.push("/")}>Close</button>
          </form>
        </div>
      </div>
    </div>
  
  );
}
