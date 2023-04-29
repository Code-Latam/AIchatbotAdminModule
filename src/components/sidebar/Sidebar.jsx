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


export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;
  const chat_url = process.env.REACT_APP_CHAT_URL;
  

  console.log(user.chatbotKey);

  const [users, setUsers] = useState([]);

  var body = {
    clientNr: clientNr,
    gwoken: gwokuToken,
    chatbotKey: user.chatbotKey   
  };

  useEffect(async () => {
    const result = await axios.post("/users/queryall", body);

    // console.log(res.data);
    setUsers(
      result.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );

    // setUsers(result.data);
  }, []);


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to={{ pathname:  chat_url }} target="_blank" style={{ textDecoration: 'none',color: 'black'  }}>AI Chatbot support for this module</Link>
          </li>
          <li className="sidebarListItem">
            <Videocam className="sidebarIcon" />
            <span className="sidebarListItemText">AI Videobot support for this module</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <Link to="/register" style={{ textDecoration: 'none',color: 'black'  }}>Register Users</Link>
          </li>
          <li className="sidebarListItem">
            <Adb className="sidebarIcon" />
            <Link to={`/registerchatbot/${user.username}/${user.chatbotKey}`} style={{ textDecoration: 'none',color: 'black'  }} >Register Chatbots</Link>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Chat History Query</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
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
