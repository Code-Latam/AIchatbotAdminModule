import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {encodebody,getDecodedBody} from "../../utils/utils.js";

export default function Feed({ username }) {
  const [chatbots, setChatbots] = useState([]);
  const { user } = useContext(AuthContext);
  const clientNr = user.clientNr;

 // get the chatbot master of the chatbot created for this user


 

  useEffect(() => {  

    const fetchChatbots = async () => {
      if (!username)
      {
        
      var originalbody = {
          clientNr: clientNr,
          chatbotMaster: user.chatbotKey
        }
      const body = encodebody(originalbody);
        // query all the bots
      const response = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/queryall/", body);
      const res = getDecodedBody(response.data);
      console.log("chatbot data");
      console.log(res);
      setChatbots(
        res.sort((p1, p2) => {
        // res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      
    }
    };
    fetchChatbots();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">

        {chatbots.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
