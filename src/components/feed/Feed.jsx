import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [chatbots, setChatbots] = useState([]);
  const { user } = useContext(AuthContext);
  const clientNr = process.env.REACT_APP_CLIENTNR;
  const gwokuToken = process.env.REACT_APP_GWOKUTOKEN;



  useEffect(() => {
    var body = {
      clientNr: clientNr,
      gwoken: gwokuToken,
      chatbotMaster: user.chatbotKey  
    };
    console.log("chatbotkey = " + body.chatbotMaster);
    const fetchChatbots = async () => {
      if (!username)
      {
        // await axios.get("/posts/profile/" + username)
      const res = await axios.post("/chatbots/queryall/", body);
      console.log(res.data);
      setChatbots(
        res.data.sort((p1, p2) => {
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
