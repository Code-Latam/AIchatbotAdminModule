// FileUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import "./uploadfiles.css";
import { useLocation } from "react-router-dom";
import FileUpload from "../../components/fileupload/FileUpload";



export default function Uploadfiles() { // use default export here
  const location = useLocation();
  console.log(location.state.chatbotKey);
  console.log(location.state.descriptiveName);
  console.log(location.state.chatbotMaster);

  


  return (
    <>
    <Topbar />
    <div className="login">
    <div className="loginWrapper">
      <div className="loadfileLeft">
        <span className="rightdes">Training options for chatbot {location.state.descriptiveName} </span>
        <span className="Desc">
          Accepted Sources:
          <ul>
          <li>PDF/DOCX/TXT/JSON/CSV</li>
          <li>URL</li>
          </ul>
        </span>
      </div>
      <div className=".loadfileRight">
      <FileUpload chatbotKey={location.state.chatbotKey} chatbotMaster={location.state.chatbotMaster} />
      </div>
    </div>
  </div>
  </>
    
  );
}
