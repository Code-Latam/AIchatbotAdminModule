import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const {username,chatbotKey} = useParams();

  var body = {
    chatbotKey: chatbotKey,
    username: username
  }
  console.log(useParams())
  console.log(body);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post("/users/query",body);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileInfo">
              <h4 className="profileInfoName">User: {user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span>
              <span className="profileInfoDesc">{user.isAdmin}</span>
              <span className="profileInfoDesc">{user.groups}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            
          </div>
        </div>
      </div>
    </>
  );
}
