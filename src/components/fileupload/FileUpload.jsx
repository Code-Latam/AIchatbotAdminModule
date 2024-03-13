// Import React from "react" module
import React from "react";
import axios from "axios";
import "./fileupload.css";
import {encodebody,getDecodedBody} from "../../utils/utils.js";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

// Create a React component
class FileUpload extends React.Component {
    constructor(props) {
        super(props);
      }

  // Create a reference to the file input element
  fileInputRef = React.createRef();

  // Create a reference to the single page URL input element
  urlInputRef = React.createRef();

  // Create a reference to the single page URL input element
  crawlInputRef = React.createRef();

  // Define the uploadFile function
  uploadFile() {
    // Get the files from the reference
    const files = this.fileInputRef.current.files;

    // Check if there are any files
    if (files.length > 0) {
      // Create a new FormData object
      const formData = new FormData();

       // append additional parameters that are needed
       formData.append("clientNr", process.env.REACT_APP_CLIENTNR);
       formData.append("gwoken", process.env.REACT_APP_GWOKUTOKEN);
       formData.append("chatbotKey", this.props.chatbotKey);
       formData.append("chatbotMaster", this.props.chatbotMaster);

      // Loop through all the files and append them to the FormData object using the same name as in the server-side code
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

     

      // Get the spinner element
      const spinner = document.getElementById("spinner");

      // Show the spinner element
      spinner.style.display = "block";


      // Send the FormData object to the server using axios
      axios
        .post(
          process.env.REACT_APP_CENTRAL_BACK + "/upload/multiple-upload",
          formData
        ) // Remove the headers option
        .then((response) => {
          // Hide the spinner element
          spinner.style.display = "none";
          // Do something with the response
          alert(response.data);
          // Process the URL if valid
          this.callAPI(this.props.chatbotKey, this.props.chatbotMaster);
          this.callAPI2(this.props.chatbotKey, this.props.chatbotMaster);
        })
        .catch((error) => {
          // Hide the spinner element
          spinner.style.display = "none";
          // Handle the error
          alert(error.response.data);
          return;
        });
    } else {
      alert("No files chosen");
      this.callAPI(this.props.chatbotKey, this.props.chatbotMaster);
      this.callAPI2(this.props.chatbotKey, this.props.chatbotMaster);
      return;
    }
  }

  // Define the callAPI function
  callAPI(chatbotKey, chatbotMaster) {
    // Get the URL from the reference
    const url = this.urlInputRef.current.value;
    if (!url)
    { alert("First URL field Empty. Proceeding with the Crawl URL if not empty");
      return
    }

    // Check if the URL is valid using a regular expression
    const regex =
      /^(https?|ftp):\/\/([a-z0-9+!*(),;?&=.-]+(:[a-z0-9+!*(),;?&=.-]+)?@)?([a-z0-9-.]*)(\.([a-z]{2,3}))(:[0-9]{2,5})?(\/([a-z0-9+%-]\.?)+)*\/?(\?([a-z+&$_.-][a-z0-9;:@&%=+/$_.-]*)?)?(#[a-z_.-][a-z0-9+$_.-]*)?$/i;

    if (regex.test(url)) {
      // Call the axios API with the URL as a parameter and handle the response and error




      const originalbody = {
        clientNr: process.env.REACT_APP_CLIENTNR,
        chatbotKey:chatbotKey,
        chatbotMaster: chatbotMaster,
        url:url
      }
      const body = encodebody(originalbody);
      axios
        .post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/addurl",body)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Invalid URL");
      return;
    }
  }

  //  function to call the crawl API

  callAPI2(chatbotKey, chatbotMaster) {
    // Get the URL from the reference
    const url = this.crawlInputRef.current.value;
    if (!url)
    { alert("Crawl URL field is empty");
      return
    }

    // Check if the URL is valid using a regular expression
    const regex =
      /^(https?|ftp):\/\/([a-z0-9+!*(),;?&=.-]+(:[a-z0-9+!*(),;?&=.-]+)?@)?([a-z0-9-.]*)(\.([a-z]{2,3}))(:[0-9]{2,5})?(\/([a-z0-9+%-]\.?)+)*\/?(\?([a-z+&$_.-][a-z0-9;:@&%=+/$_.-]*)?)?(#[a-z_.-][a-z0-9+$_.-]*)?$/i;

    if (regex.test(url)) {
      // Call the axios API with the URL as a parameter and handle the response and error



      const originalbody = {
        clientNr: process.env.REACT_APP_CLIENTNR,
        chatbotKey:chatbotKey,
        chatbotMaster: chatbotMaster,
        url:url
      }
      const body = encodebody(originalbody);
      axios
        .post(process.env.REACT_APP_CENTRAL_BACK + "/chatbots/crawl",body)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Invalid crawl URL");
      return;
    }
  }

  

  // Define the render function
  render() {
    // Return JSX format with parentheses
    return (
      <div>
        <form
          className="uploadBox"
          action="/multiple-upload"
          method="POST"
          enctype="multipart/form-data"
        >
          {/* Remove onchange attribute */}
          {/* Add multiple attribute to allow multiple files */}
          {/* Add accept attribute to specify file types */}
          {/* Use className instead of class */}
          {/* Use camelCase for acceptCharset */}
          {/* Pass fileInputRef as ref prop */}
          <button className="myupload" type="button" onClick={() => this.uploadFile()}>
              Upload
            </button>
          <div className="uploadelements">
            <input
              type="file"
              id="file"
              name="file"
              multiple
              className="fileInput"
              acceptCharset="utf-8"
              accept=".csv,.txt,.json,.pdf,.docx"
              ref={this.fileInputRef}
            />
            {/* Add spinner element to show animation */}
            {/* Add type and onClick attributes */}
            
            
            
            <div id="spinner" style={{ display: "none" }}>
              <img src={`${PF}spinner.gif`} alt="Loading..." />
            </div>
            
          </div>
          <input placeholder="Paste URL to scan here" className="urlInput" ref={this.urlInputRef} />
          <input placeholder="Paste URL to crawl here" className="urlInput" ref={this.crawlInputRef} />
        </form>
      </div>
    );
  }
}

// Export the component
export default FileUpload;