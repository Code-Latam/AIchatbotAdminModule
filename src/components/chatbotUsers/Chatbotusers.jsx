// Importing axios to make API calls
import axios from "axios";
import "./chatbotUsers.css";
import { useHistory } from "react-router";




export default function ChatbotUsers({user}) {
  var history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
      await axios.post("/users/delete", { username, email, chatbotKey });
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
    {/* Adding a clickable delete icon with an onClick handler */}
    {/* You can use any image source you want for the icon */}
    <img
      className="deleteIcon"
      src={`${PF}delete.png`}
      alt="Delete"
      onClick={handleDelete}
    />
  </li>
);
}
