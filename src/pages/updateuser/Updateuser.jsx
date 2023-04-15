import axios from "axios";
import { useRef } from "react";
import "./updateuser.css";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Updateuser() {

  const { user: currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const formRef = useRef(null);

  const chatbotKey = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        chatbotKey: chatbotKey.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/users/update", user);
        alert("User has been updated");
        history.push("/");
      } catch (err) {
        alert(err.response.data)
        }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DevX.Chat</h3>
          <span className="loginDesc">
            Change your password regularly for more security.
          </span>
        </div>
        <div className="loginRight">
          <form ref={formRef} className="loginBox" onSubmit={handleClick}>
          <input
              placeholder="Chatbot Key"
              required
              ref={chatbotKey}
              className="loginInput"
              value = {currentUser.chatbotKey}
              disabled
            />
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              value = {currentUser.username}
              disabled
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              value = {currentUser.email}
              disabled
            />
            <input
              placeholder="New Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="New Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Change
            </button>
            <button className="loginRegisterButton"  onClick={() => history.push("/")}>Close</button>
          </form>
        </div>
      </div>
    </div>
  );
}
