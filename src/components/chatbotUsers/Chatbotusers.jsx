// Importing axios to make API calls
import axios from "axios";
import "./chatbotUsers.css";
import { useHistory } from "react-router";
import {encodebody,getDecodedBody} from "../../utils/utils.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  Adb,
  Email,
  Delete,
  Edit,
} from "@material-ui/icons";




export default function ChatbotUsers({user}) {

  var history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const chat_url = process.env.REACT_APP_CHAT_URL;
  const admin_module_url = process.env.REACT_APP_ADMIN_URL;
  const { user: currentuser } = useContext(AuthContext);
  const clientNr = currentuser.clientNr;

  const handleEdit = () => {
    console.log("USER");
    console.log(user);
    history.push({
      pathname: "/updateuseradmin", 
      state: { user, clientNr },
    });
  };

// A function that handles the delete icon click
const handleDelete = async () => {
  // Getting the user data from the props
  const { username, email, chatbotKey } = user;
  // Showing a confirmation dialog with the username
  // The window.confirm method returns true or false depending on the user's choice
  const confirmed = window.confirm(
    `Are you sure you want to delete ${username}?`
  );
  // If the user confirms, proceed with the API call
  if (confirmed) {
    // Making a post request to the API with the user data
    try {
      const originalbody = {
        clientNr: clientNr,
        username:username,
        email: email,
        chatbotKey:chatbotKey
      }
      const body = encodebody(originalbody);
      await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/users/delete", body);
      // Optionally, you can do something after the request is successful
      // For example, alert the user or refresh the page
      alert(`User ${username} deleted successfully`);
      history.go(0);
    } catch (err) {
      // Handle any errors that may occur
      alert("Something went wrong. The user was not deleted");
    }
  }
  // If the user cancels, do nothing
};


return (
  <li className="sidebarUser">
    {/* Adding two hidden input fields for email and chatbotKey */}
    <input type="hidden" value={user.email} />
    <input type="hidden" value={user.chatbotKey} />
    <span className="sidebarUserName">{user.username}</span>
{/* Adding a clickable email icon */}
    
      <Edit
      className="userIcon"
      alt="Edit"
      onClick={handleEdit}
    />
    {/* Adding a clickable delete icon with an onClick handler */}
    <Delete
      className="userIcon"
      src={`${PF}delete.png`}
      alt="Delete"
      onClick={handleDelete}
    />
    <a href={`mailto:${user.email }?subject=Gwocu Chatbot&body=Dear ${user.username},%0D%0DYour email has been linked to a chatbot. If you are an administrator, you will be able to use the Administrative Module.%0D%0DIf you are only a chatbot user you will only be able to use the chatbot.%0D%0DPlease find below your login credentials. Change your password as soon as you login.%0D%0DYour credentials are:%0D%0D
      chatbot URL: ${chat_url}/${user.chatbotKey}%0D
      chatbot Admin Module URL: ${admin_module_url}%0D
      ChatbotKey: ${user.chatbotKey}%0D
      email: ${user.email }%0D
      Initial Password: Your password will be sent through a seperate channel.%0D%0D
      Have fun with your chatbot!%0D`}
                >
          <Email
          className="userIcon"
          src={`${PF}email.png`}
          alt="email"
          />
          </a>
  </li>
);
}
