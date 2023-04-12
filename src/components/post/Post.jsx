import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {

  const [chatTotalSatisfactory, setChatTotalSatisfactory] = useState(0);
  const [chatTotalNotSatisfactory, setChatTotalNotSatisfactory] = useState(0);
  const [chatTotal, setChatTotal] = useState(0);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

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
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
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
              src={`${PF}like.png`}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              alt=""
            />
            <span className="postLikeCounter"> From a total of {chatTotal} questions last month, the bot gave {chatTotalSatisfactory} satisfactory and {chatTotalNotSatisfactory} unsatisfactory answers</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
