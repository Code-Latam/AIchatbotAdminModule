import "./sidebar.css";
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
import { Users } from "../../dummyData";
import ChatbotUsers from "../chatbotUsers/Chatbotusers";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from 'react-router-dom';
import {encodebody,getDecodedBody} from "../../utils/utils.js";


export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const clientNr = user.clientNr;
  const chat_url = process.env.REACT_APP_CHAT_URL;


  const [users, setUsers] = useState([]);

  var originalbody = {
    clientNr: clientNr,
    chatbotKey: user.chatbotKey   
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
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">
            <Link to={{ pathname:  chat_url }} target="_blank" style={{ textDecoration: 'none',color: '#03A062'  }}>AI Chatbot support for this module</Link>
            </span>
          </li>
          <li className="sidebarListItem">
            <Videocam className="sidebarIcon" />
            <span className="sidebarListItemText">AI Videobot support for this module</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <Link to="/register" style={{ textDecoration: 'none',color: '#03A062'  }}>Register Users</Link>
          </li>
          <li className="sidebarListItem">
            <Adb className="sidebarIcon" />
            <Link to={`/registerchatbot/${user.username}/${user.chatbotKey}`} style={{ textDecoration: 'none',color: '#03A062'  }} >Register Chatbots</Link>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Chat History Query</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <Link to="/explorer" style={{ textDecoration: 'none',color: '#03A062'  }}>APIFny Explorer</Link>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <h4>Users</h4>
        <hr className="sidebarHr" />
         <ul className="sidebarChatbotList">
         {users.map((u) => (
         <ChatbotUsers key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
