import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {encodebody, getDecodedBody} from "../../utils/utils.js";

import { AuthContext } from "../../context/AuthContext";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentuser } = useContext(AuthContext);
  const clientNr = currentuser.clientNr;


  const [user, setUser] = useState({});

  const {username,chatbotKey} = useParams();

  var originalbody = {
    clientNr: clientNr,
    chatbotKey: chatbotKey,
    username: username
  }
  const body = encodebody(originalbody);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/users/query",body);
      setUser(getDecodedBody(res.data));
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
          <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
            <h4 className="profileInfoName">--user logged in--</h4>
            <span className="profileInfoName">{user.username}</span>
            <span className="profileInfoDesc">{user.email}</span>
            <span className="profileInfoDesc">{user.isAdmin ? "Administrator" : "Not an administrator"}</span>
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
