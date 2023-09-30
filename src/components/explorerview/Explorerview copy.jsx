import React, { useState, useEffect } from "react"
import { Graph } from "react-d3-graph"
import "./explorerview.css"
import axios from "axios";
import Modal from "../modal/Modal";

const config = {
  nodeHighlightBehavior: true,
  directed: true,
  node: 
  {
    color: "#03A062",
    highlightStrokeColor: "#03A062",
    labelProperty: "label",
    fontColor:"#03A062",
  },
  link: {
    highlightColor: "#03A062",
    renderArrow: true,
    strokeWidth: 2,
  },
  width: 400, // Set the width of the graph (adjust as needed)
  height: 300, // Set the height of the graph (adjust as needed)
};

const Explorerview = () => {
    // Define a state variable to store the data from the API
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  
    // Define a function to fetch the data from the API
    const handleShowModal = (graph) => {
      setSelectedWorkflow(graph);
      setShowModal(true);
    };

    const fetchData = async () => {
      try {
        const mybody = 
        {
          clientNr: "Pockyt",
          explorerId: "1"
        }
        // Make the API call using axios and parse the response as JSON
        const response = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/workflow/querygraph", mybody);
        const json = response.data;
  
        // Set the data state variable with the JSON data
        setData(json);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };
  
    // Use useEffect to fetch the data when the component mounts
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className= "App">
        <div className="top-part">
          {data.map((graph, index) => (
            <div key={index}>
              <div
            className="graph-header"
            onClick={() => {
              console.log("Clicked graph:", graph); // Debugging statement
              handleShowModal(graph);
            }}
          >
            {graph.name}
          </div>
              <Graph key={index} id={`graph-${index}`} data={graph} config={config} />
            </div>
          ))}
        </div>
        <div className="bottom-part">
        
        </div>
        {showModal && (
        <Modal
          graph={selectedWorkflow}
          onClose={() => {
            setSelectedWorkflow(null);
            setShowModal(false);
          }}
        />
      )}
      </div>
    );
          }   
    
export default Explorerview;