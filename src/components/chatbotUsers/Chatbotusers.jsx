// Importing axios to make API calls
import axios from "axios";
import "./chatbotUsers.css";
import { useHistory } from "react-router";




export default function ChatbotUsers({user}) {

  var history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;
  const chat_url = process.env.REACT_APP_CHAT_URL;
  const admin_module_url = process.env.REACT_APP_ADMIN_URL;

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
      const body = {
        clientNr: clientNr,
        gwoken: gwokuToken,
        username:username,
        email: email,
        chatbotKey:chatbotKey
      }
      await axios.post("/users/delete", body);
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
    <a href={`mailto:${user.email }?subject=Gwocu Chatbot&body=Dear ${user.username},%0D%0DYour email has been linked to a chatbot. If you are an administrator, you will be able to use the Administrative Module.%0D%0DIf you are only a chatbot user you will only be able to use the chatbot.%0D%0DPlease find below your login credentials. Change your password as soon as you login.%0D%0DYour credentials are:%0D%0D
chatbot URL: ${chat_url}/${user.chatbotKey}%0D
chatbot Admin Module URL: ${admin_module_url}%0D
ChatbotKey: ${user.chatbotKey}%0D
email: ${user.email }%0D
Initial Password: Your password will be sent through a seperate channel.%0D%0D
Have fun with your chatbot!%0D`}
          >
          <img
          className="mailIcon"
          src={`${PF}email.png`}
          alt="email"
          />
          </a>

    {/* Adding a clickable delete icon with an onClick handler */}
    <img
      className="deleteIcon"
      src={`${PF}delete.png`}
      alt="Delete"
      onClick={handleDelete}
    />
  </li>
);
}
