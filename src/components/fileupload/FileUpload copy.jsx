// Import React from "react" module
import React from "react";
import axios from "axios";
import "./fileupload.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

// Create a React component
class FileUpload extends React.Component {
  // Create a reference to the file input element
  fileInputRef = React.createRef();

  // Define the uploadFile function
  uploadFile() {
    // Get the files from the reference
    const files = this.fileInputRef.current.files;

    // Check if there are any files
    if (files.length > 0) {
      // Create a new FormData object
      const formData = new FormData();

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
        .post(process.env.REACT_APP_CENTRAL_BACK + "/upload/multiple-upload", formData) // Remove the headers option
        .then((response) => {
          // Hide the spinner element
          spinner.style.display = "none";
          // Do something with the response
          alert(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // Hide the spinner element
          spinner.style.display = "none";
          // Handle the error
          alert(error.response.data)
          return
        });
        // process the URL

        

    }
    else
    {
        alert("No files chosen");
        return
    }
  }

  // Define the render function
  render() {
    // Return JSX format with parentheses
    return (
      <div>
        <form className="uploadBox" action="/multiple-upload" method="POST" enctype="multipart/form-data">
          {/* Remove onchange attribute */}
          {/* Add multiple attribute to allow multiple files */}
          {/* Add accept attribute to specify file types */}
          {/* Use className instead of class */}
          {/* Use camelCase for acceptCharset */}
          {/* Pass fileInputRef as ref prop */}
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
          <button className="myupload" type="button" onClick={() => this.uploadFile()}>
            Submit
          </button>
          </div>
          <input
              placeholder="Paste URL"
              className="loginInput"
            />
          <div id="spinner" style={{ display: "none" }}>
            <img src={`${PF}spinner.gif`} alt="Loading..." />
          </div>
        </form>
      </div>
    );
  }
}

// Export the component
export default FileUpload;

