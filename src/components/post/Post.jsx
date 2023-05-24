import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";


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
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const chat_url = process.env.REACT_APP_CHAT_URL;
  const admin_module_url = process.env.REACT_APP_ADMIN_URL;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;

  

  const { user: currentUser } = useContext(AuthContext);
  
  var history = useHistory();

  // begin go chat

  const handlegochat = async () => {
    // Getting the user data from the props
    const { chatbotKey, descriptiveName } = post; 
      try {
        const body = {
          clientNr: clientNr,
          gwoken: gwokuToken,
          chatbotKey:chatbotKey,
          descriptiveName: descriptiveName
        }
        console.log("chat_url=" + chat_url)
        await axios.post(chat_url, body);
      } catch (err) {
        // Handle any errors that may occur
        alert("Something went wrong. The chatbot was not started");
      }
  };

  // end go chat

  
  
// A function that handles the delete icon click
const handleDelete = async () => {
  // Getting the user data from the props
  const { name, chatbotKey, chatbotMaster,descriptiveName } = post;
  
  // Showing a confirmation dialog with the username
  // The window.confirm method returns true or false depending on the user's choice
  const confirmed = window.confirm(
    `This operation is very distructive. Are you sure you want to delete ${descriptiveName}? If you delete this chatbot, all of its users and chathistory will be deleted too!`
  );
  // If the user confirms, proceed with the API call
  if (confirmed) {
    // Making a post request to the API with the chattbot data
    try {
      const body = {
        clientNr: clientNr,
        gwoken: gwokuToken,
        chatbotKey:chatbotKey,
        chatbotMaster: chatbotMaster,
        name: name
      }
      await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/delete", body);
      // Optionally, you can do something after the request is successful
      // For example, alert the user or refresh the page
      alert(`Chatbot ${descriptiveName} deleted successfully`);
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
        clientNr: clientNr,
        gwoken: gwokuToken,
        chatbotKey: post.chatbotKey,
        chatRequestResult : "FOUND",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "chathistory/queryperiodcount", body);
      setChatTotalSatisfactory(res.data);
    };
    fetchChatTotalSatisfactory();
  }, [post.userId]);

  useEffect(() => {
    const fetchChatTotalNotSatisfactory = async () => {
      const body =
      {
        clientNr: clientNr,
        gwoken: gwokuToken,
        chatbotKey: post.chatbotKey,
        chatRequestResult : "NOT FOUND",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "chathistory/queryperiodcount", body);
      setChatTotalNotSatisfactory(res.data);
    };
    fetchChatTotalNotSatisfactory();
  }, [post.userId]);

  useEffect(() => {
    const fetchChatTotal = async () => {
      const body =
      {
        clientNr: clientNr,
        gwoken: gwokuToken,
        chatbotKey: post.chatbotKey,
        chatRequestResult : "ALL",
        start : formattedDateoneMonthAgo,
        end : getFormattedDate()
      }
      const res = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "chathistory/queryperiodcount", body);
      setChatTotal(res.data);
    };
    fetchChatTotal();
  }, [post.userId]);


  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <a href= {`${chat_url}?chatbotkey=${post.chatbotKey}`} target="_blank">
          <img
          className="chatIcon"
          src={`${PF}chatgpt.png`}
          alt="Chat"
          />
          </a>
          <span className="chatbotFieldBold">{post.descriptiveName}</span>
         
          </div>
          <div className="postTopRight">
          <div className="checkboxes"> 
<input className="checkmark" type="checkbox" id="paid" checked={post.paid === true} disabled /> <label className="checkboxitem" for="paid">Paid</label> 
<input className="checkmark" type="checkbox" id="enabled" checked={post.enabled === true} disabled /> <label className="checkboxitem"  for="enabled">Enabled</label> 
<input className="checkmark" type="checkbox" id="publicbot" checked={post.publicbot === true} disabled /> <label className="checkboxitem" for="publicbot">Publicbot</label> 
<input className="checkmark" type="checkbox" id="isAdmin"   checked={post.isAdminModule === true} disabled /> <label className="checkboxitem" for="isAdminModule">Is Admin Module</label> 
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
          <Link to={{ pathname: "/uploadfiles", state: { chatbotKey: post.chatbotKey, descriptiveName: post.descriptiveName,chatbotMaster: post.chatbotMaster } }}>
          <img
          className="fileIcon"
          src={`${PF}upload.png`}
          alt="File"
          />
          </Link>
          <a href={`mailto:${post.email }?subject=Gwocu Chatbot&body=Dear Administrator,%0D%0DYour email has been linked to a chatbot. You will be able to use the Administrative Module and the regular chatbot.%0D%0DPlease find below your login credentials. Change your password as soon as you login.%0D%0DYour credentials are:%0D%0D
chatbot URL: ${chat_url}/${post.chatbotKey}%0D
Administrative Module URL: ${admin_module_url}%0D
ChatbotKey: ${post.chatbotKey}%0D
email: ${post.email }%0D
Initial Password: ${post.initialPassword }%0D%0D
Have fun with your chatbot!%0D`}
          >
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
