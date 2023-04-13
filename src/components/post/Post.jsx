import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";


function evaluate(S, U) {
  

  // calculate the sum of S and U
  let total = S + U;

  if (total === 0) {
    return "heart.png";
  }

  // calculate the percentage of S out of the total
  let percentage = S / total;

  // compare the percentage with the thresholds
  if (percentage >= 0.8) {
    return "heart.png";
  } else if (percentage >= 0.7) {
    return "like.png";
  } else {
    return "sad-face.png";
  }
};

export default function Post({ post }) {

  const [chatTotalSatisfactory, setChatTotalSatisfactory] = useState(0);
  const [chatTotalNotSatisfactory, setChatTotalNotSatisfactory] = useState(0);
  const [chatTotal, setChatTotal] = useState(0);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  
  var history = useHistory();

  
// A function that handles the delete icon click
const handleDelete = async () => {
  // Getting the user data from the props
  const { name, chatbotKey, chatbotMaster } = post;
  
  // Showing a confirmation dialog with the username
  // The window.confirm method returns true or false depending on the user's choice
  const confirmed = window.confirm(
    `Are you sure you want to delete chatbot ${name}?`
  );
  // If the user confirms, proceed with the API call
  if (confirmed) {
    // Making a post request to the API with the chattbot data
    try {
      await axios.post("/chatbots/delete", { chatbotKey,chatbotMaster,name });
      // Optionally, you can do something after the request is successful
      // For example, alert the user or refresh the page
      alert(`Chatbot ${name} deleted successfully`);
      history.go(0);
    } catch (err) {
      // Handle any errors that may occur
      alert("Something went wrong. The chatbot was not deleted");
    }
  }
  // If the user cancels, do nothing
};



  var today = new Date();
  // Get one month ago by subtracting 1 from the current month
  var oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  // Format the date as MM/DD/YYYY using the getMonth(), getDate() and getFullYear() methods
  var formattedDateoneMonthAgo = (oneMonthAgo.getMonth() + 1) + "/" + oneMonthAgo.getDate() + "/" + oneMonthAgo.getFullYear();

  function getFormattedDate() {
    // Create a new Date object
    const today = new Date();
  
    // Get the current day, month, and year
    const day = today.getDate(); // 5
    const month = today.getMonth() + 1; // 4 (Month is 0-based, so add 1)
    const year = today.getFullYear(); // 2023
  
    // Format the date as MM/DD/YYYY
    const formattedDate = month + '/' + day + '/' + year; // 4/5/2023
  
    // Return the formatted date
    return formattedDate;
  }

  useEffect(() => {
    const fetchChatTotalSatisfactory = async () => {
      const body =
      {
        chatbotKey: post.chatbotKey,
        chatRequestResult : "FOUND",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post("chathistory/queryperiodcount", body);
      setChatTotalSatisfactory(res.data);
    };
    fetchChatTotalSatisfactory();
  }, [post.userId]);

  useEffect(() => {
    const fetchChatTotalNotSatisfactory = async () => {
      const body =
      {
        chatbotKey: post.chatbotKey,
        chatRequestResult : "NOT FOUND",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post("chathistory/queryperiodcount", body);
      setChatTotalNotSatisfactory(res.data);
    };
    fetchChatTotalNotSatisfactory();
  }, [post.userId]);

  useEffect(() => {
    const fetchChatTotal = async () => {
      const body =
      {
        chatbotKey: post.chatbotKey,
        chatRequestResult : "ALL",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post("chathistory/queryperiodcount", body);
      setChatTotal(res.data);
    };
    fetchChatTotal();
  }, [post.userId]);


  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <img
          className="chatIcon"
          src={`${PF}chatgpt.png`}
          alt="Chat"
          onClick={handleDelete}
          />
          <span className="chatbotFieldBold">{post.name}</span>
         
          </div>
          <div className="postTopRight">
          <div className="checkboxes"> 
<input className="checkbox" type="checkbox" id="paid" checked={post.paid === true} disabled /> <label className="checkboxitem" for="paid">Paid</label> 
<input type="checkbox" id="enabled" checked={post.enabled === true} disabled /> <label className="checkboxitem"  for="enabled">Enabled</label> 
<input type="checkbox" id="publicbot" checked={post.publicbot === true} disabled /> <label className="checkboxitem" for="publicbot">Publicbot</label> 
<input type="checkbox" id="isAdmin"   checked={post.isAdminModule === true} disabled /> <label className="checkboxitem" for="isAdminModule">Is Admin Module</label> 
</div> 
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.promptTemplate}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}${evaluate(chatTotalSatisfactory, chatTotalNotSatisfactory)}`}
              alt=""
            />
      
            <span className="postLikeCounter"> From a total of {chatTotal} questions last month, the bot gave {chatTotalSatisfactory} satisfactory and {chatTotalNotSatisfactory} unsatisfactory answers</span>
          </div>
          <div className="postBottomRight">
          <img
          className="chatIcon"
          src={`${PF}chatgpt.png`}
          alt="Chat"
          onClick={handleDelete}
          />
          <a href="mailto:example@example.com?subject=Hello&body=Click here to send mail">
          <img
          className="mailIcon"
          src={`${PF}email.png`}
          alt="email"
          />
          </a>
          <img
          className="deleteIcon"
          src={`${PF}delete.png`}
          alt="Delete"
          onClick={handleDelete}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
