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

 // get the chatbot master of the chatbot created for this user


 

  useEffect(() => {


    

     
  
    

    const fetchChatbots = async () => {
      if (!username)
      {
        // get the chatbot master
        
        var body = {
          clientNr: clientNr,
          gwoken: gwokuToken,
          chatbotMaster: user.chatbotKey
        }
        console.log("response = ");
       
        // query all the bots
      const res = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/queryall/", body);
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
