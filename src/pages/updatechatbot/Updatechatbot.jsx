import axios from "axios";
import { useRef } from "react";
import "./updatechatbot.css";
import { useHistory } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import {encodebody,getDecodedBody} from "../../utils/utils.js";
import { AuthContext } from "../../context/AuthContext";
import ChatbotUsers from "../../components/chatbotUsers/Chatbotusers";
import { Link } from 'react-router-dom';
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Videocam,
  Adb
} from "@material-ui/icons";

export default function Updatechatbot() {
  const {PchatbotKey,PchatbotMaster,PopenaiKey,PdescriptiveName,PpromptTemplate, PclientNr,Pgwoken,Pgwokutoken,PE2EE,Ppublicbot,Ppaid,Penabled,PisAdminModule} = useParams();


  const [publicbotChecked, setPublicbotChecked] = useState(JSON.parse(Ppublicbot));
  const [paidChecked, setpaidChecked] = useState(JSON.parse(Ppaid));
  const [enabledChecked, setenabledChecked] = useState(JSON.parse(Penabled));
  const [isAdminModuleChecked, setisAdminModuleChecked] = useState(JSON.parse(PisAdminModule));

  

  const formRef = useRef(null);
  const chatbotKey = useRef();
  const openaiKey = useRef();
  const descriptiveName = useRef();
  const promptTemplate = useRef();
  const publicbot = useRef(false);
  const paid = useRef(false);
  const enabled = useRef(false);
  const isAdminModule = useRef(false);
  const history = useHistory();

  const { user: currentuser } = useContext(AuthContext);
  const clientNr = currentuser.clientNr;

  

  

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
    
   
    
    const chatbot = {
      clientNr: clientNr,
      chatbotMaster: PchatbotMaster,
      chatbotKey: PchatbotKey,
      openaiKey: openaiKey.current.value,
      descriptiveName: descriptiveName.current.value, 
      promptTemplate: promptTemplate.current.value,
      publicbot: ["on", "true", true].includes(publicbot.current.value),
      paid: ["on", "true", true].includes(paid.current.value),
      enabled: ["on", "true", true].includes(enabled.current.value),
      isAdminModule: ["on", "true", true].includes(isAdminModule.current.value)
    };

      const body = encodebody(chatbot);
    
      try {
        await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/update",body );
        alert("Chatbot has been updated");
        // formRef.current.reset(); // clear the form fields
        // reset the checkboxes
        // setPublicbotChecked(false);
        // setpaidChecked(false);
        // setenabledChecked(false);
        // setisAdminModuleChecked(false);

        history.push(`/updatechatbot/${username}/${chatbotMaster}`);
      } catch (err) {
        alert(getDecodedBody(err.response.data))
        }
  };

  const [users, setUsers] = useState([]);

  var originalbody = {
    clientNr: clientNr,
    chatbotKey: PchatbotKey   
  };
  const body = encodebody(originalbody);
  useEffect(async () => {
    const myresult = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/users/queryall", body);
    const result = getDecodedBody(myresult.data);
    setUsers(
      result.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  }, []);

  return (
    <>
    <Topbar />
    <div className="updatechatbot">
      <div className="updatechatbotWrapper">
        <div className="updatechatbotLeft">
          <ul className="userList">
         {users.map((u) => (
         <ChatbotUsers key={u.id} user={u} source = "chatbotupdate"/>
          ))}
        </ul>
        <div className="registerListItem" >
        <div  className = "linkItem">
        <Link to={`/register/${PchatbotKey}`} style={{ textDecoration: 'none',color: '#03A062'  }}>Register New Users</Link>
        </div>
        </div>
        </div>
        <div className="updatechatbotRight">
          <form ref={formRef} className="updatechatbotloginBox" onSubmit={handleClick}>
            <input
              placeholder="Chatbot Key"
              required
              ref={chatbotKey}
              className="updatechatbotInput"
              readonly
              value={PchatbotKey}
            />
            <input
              placeholder="OpenAI Key"
              required
              ref={openaiKey}
              className="updatechatbotInput"
              defaultValue={PopenaiKey}
            />
            <input
              placeholder="Short descriptive name"
              required
              ref={descriptiveName}
              className="updatechatbotInput"
              defaultValue = {PdescriptiveName}
              type="text"
            />
            <textarea
              placeholder="Prompt Template"
              required
              ref={promptTemplate}
              className="textareaInput"
              defaultValue={PpromptTemplate}
              rows={8} // You can adjust the number of rows as needed
              cols={40} // You can adjust the number of columns as needed
            />
            
            <div style={{ display: "flex", flexDirection: "row" }}> 
            <label className="updatechatbotcheckboxLabel">
            Public bot
              <input
              ref={publicbot}
              className = "updatechatbotcheckmark"
              type="checkbox"
              checked={publicbotChecked}
              onChange={handleCheckboxChange}
            />
            </label>
            <label className="updatechatbotcheckboxLabel">
            Paid
              <input
              ref={paid}
              className = "updatechatbotcheckmark"
              type="checkbox"
              checked={paidChecked}
            
              onChange={paidCheckboxChange}
            />
            </label>
            <label className="updatechatbotcheckboxLabel">
            Enabled
              <input
              ref={enabled}
              className = "updatechatbotcheckmark"
              type="checkbox"
              checked={enabledChecked}
              
              onChange={enabledCheckboxChange}
            />
            </label>
            <label className="updatechatbotcheckboxLabel">
            Admin Module
              <input
              ref={isAdminModule}
              className = "updatechatbotcheckmark"
              type="checkbox"
              checked={isAdminModuleChecked}
              
              onChange={isAdminModuleCheckboxChange}
            />
            </label>
            </div>
            
            
            <button className="updatechatbotloginButton" type="submit">
              Update
            </button>
            <button className="loginUpdateButton"  onClick={() => history.push("/")}>Close</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
