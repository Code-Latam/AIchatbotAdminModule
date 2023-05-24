import axios from "axios";
import { useRef } from "react";
import "./registerchatbot.css";
import { useHistory } from "react-router";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";

export default function Registerchatbot() {
  const [publicbotChecked, setPublicbotChecked] = useState(false);
  const [paidChecked, setpaidChecked] = useState(false);
  const [enabledChecked, setenabledChecked] = useState(false);
  const [isAdminModuleChecked, setisAdminModuleChecked] = useState(false);

  const {username,chatbotMaster} = useParams();

  const formRef = useRef(null);
  const chatbotKey = useRef();
  const openaiKey = useRef();
  const descriptiveName = useRef();
  const name = useRef();
  const email = useRef();
  const initialPassword = useRef();
  const publicbot = useRef(false);
  const paid = useRef(false);
  const enabled = useRef(false);
  const isAdminModule = useRef(false);
  const promptTemplate = useRef();
  const idEnroller = useRef();
  const history = useHistory();
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;

  

  

  const handleCheckboxChange = (e) => {
    setPublicbotChecked(e.target.checked);
    publicbot.current.value = e.target.checked;
  };

  const paidCheckboxChange = (e) => {
    setpaidChecked(e.target.checked);
    paid.current.value = e.target.checked;
  };

  const enabledCheckboxChange = (e) => {
    setenabledChecked(e.target.checked);
    enabled.current.value = e.target.checked;
  };

  const isAdminModuleCheckboxChange = (e) => {
    setisAdminModuleChecked(e.target.checked);
    isAdminModule.current.value = e.target.checked;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(publicbotChecked.current.value);

   
    
      const chatbot = {
        clientNr: clientNr,
        gwoken: gwokuToken,
        chatbotMaster: chatbotMaster,
        chatbotKey: chatbotKey.current.value,
        openaiKey: openaiKey.current.value,
        descriptiveName: descriptiveName.current.value,
        name: name.current.value,
        initialPassword: initialPassword.current.value,
        email: email.current.value,
        publicbot: publicbot.current.value,
        paid: paid.current.value,
        enabled: enabled.current.value,
        isAdminModule: isAdminModule.current.value,
        idEnroller: username,
      };

      
      console.log(chatbot);
      try {
        await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/register", chatbot);
        alert("Chatbot has been registered");
        formRef.current.reset(); // clear the form fields
        // reset the checkboxes
        setPublicbotChecked(false);
        setpaidChecked(false);
        setenabledChecked(false);
        setisAdminModuleChecked(false);

        history.push(`/registerchatbot/${username}/${chatbotMaster}`);
      } catch (err) {
        alert(err.response.data)
        }
  };

  return (
    <>
    <Topbar />
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GWOCU Chat</h3>
          <span className="loginDesc">
            Register all your chatbots in one place.
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
              placeholder="OpenAI Key"
              required
              ref={openaiKey}
              className="loginInput"
            />
            <input
              placeholder="Short descriptive name"
              required
              ref={descriptiveName}
              className="loginInput"
            />
            <input
              placeholder="Name collection"
              required
              ref={name}
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
              placeholder="Initial Password"
              required
              ref={initialPassword}
              className="loginInput"
            />
            <div style={{ display: "flex", flexDirection: "row" }}> 
            <label className="checkboxLabel">
            Public bot
              <input
              ref={publicbot}
              className = "checkmark"
              type="checkbox"
              checked={publicbotChecked}
              
              onChange={handleCheckboxChange}
            />
            </label>
            <label className="checkboxLabel">
            Paid
              <input
              ref={paid}
              className = "checkmark"
              type="checkbox"
              checked={paidChecked}
            
              onChange={paidCheckboxChange}
            />
            </label>
            <label className="checkboxLabel">
            Enabled
              <input
              ref={enabled}
              className = "checkmark"
              type="checkbox"
              checked={enabledChecked}
              
              onChange={enabledCheckboxChange}
            />
            </label>
            <label className="checkboxLabel">
            Admin Module
              <input
              ref={isAdminModule}
              className = "checkmark"
              type="checkbox"
              checked={isAdminModuleChecked}
              
              onChange={isAdminModuleCheckboxChange}
            />
            </label>
            </div>
            
            <button className="loginButton" type="submit">
              Registerchatbot
            </button>
            <button className="loginRegisterButton"  onClick={() => history.push("/")}>Close</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
