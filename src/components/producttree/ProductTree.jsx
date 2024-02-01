import React, { useState, useEffect } from 'react';
import "./producttree.css" ;
import axios from "axios";
import ApiTerminal from "../../components/apiTerminal/ApiTerminal";
import Graphview from "../../components/graphview/Graphview";
import Productview from "../productview/Productview";
import Workflowview from '../workflowview/Workflowview';

const clientNr = "Pockyt";
const explorerId = "1";

const TreeNode = ({ label, children, isChild, topLevelClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = (product) => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`tree-node ${isChild ? 'child-node' : ''}`}>
      <span onClick={topLevelClick || toggleCollapse}>
        {collapsed ? '▶' : '▼'} {label}
      </span>
      <div style={{ display: collapsed ? 'none' : 'block' }}>
        {children}
      </div>
    </div>
  );
};

const ProductTree = () => {
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWork, setSelectedWorkflow] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [products, setProducts] = useState([]);
  const handleSelectedItemChange = (newValue,newTaskId) => {
    setSelectedItemType(newValue);
    setSelectedTaskId(newTaskId);
  };

  const handleProductClick = (product) => {
    console.log("product clicked");
    console.log(product);
    setSelectedItemType('product'); // Set the selected item type to 'product'
    setSelectedProduct(product); // Set the selected product
    setSelectedWorkflow(null);
  };

  const handleWorkflowClick = (workflow,product) => {
    console.log("workflow clicked");
    console.log(workflow);
    setSelectedItemType('workflow');
    setSelectedWorkflow(workflow);
    setSelectedProduct(product);
  };

  useEffect(() => {
    // Fetch the initial products using an API call
    // Replace this with your actual API endpoint
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    
    try {
      const mybody = 
      {
        clientNr: clientNr,
        explorerId: explorerId
      }
      // Make the API call using axios and parse the response as JSON
      const response = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/product/gettree", mybody);
      const json = response.data;

      // Set the data state variable with the JSON data
      setProducts(json);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }

   //  const mockProducts = [
   //   { name: 'Product 1', workflows: ['Workflow 1', 'Workflow 2'] },
   //  { name: 'Product 2', workflows: ['Workflow 3'] },
   // ];

    // setProducts(mockProducts);
  };

  const renderTree = (nodes, isChild) => {
    return nodes.map((node, index) => (
      <TreeNode
        key={index}
        label={node.name}
        isChild={isChild}
        onProductClick={handleProductClick}
        topLevelClick={isChild ? undefined : () => handleProductClick(node.name)}
      >
        {node.workflows.map((workflow, wIndex) => (
          <div
            key={wIndex}
            className="workflow"
            onClick={() => handleWorkflowClick(workflow,node.name)} // Handle workflow click
          >
            {workflow}
          </div>
        ))}
      </TreeNode>
    ));
  };


  return (
    <div className="main-container">
        <div className="left-container">
          {renderTree(products, false)}
        </div>
      <div className = "right-container">
        <div className="graph-view">
          <Graphview
            selectedProduct={selectedProduct}
            selectedWork={selectedWork}
            onTaskChange = {handleSelectedItemChange}
          />
        </div>
        <div className="lower-panel">
        {selectedItemType === 'product' ? 
        <Productview
        clientNr = {clientNr}
        explorerId = {explorerId}
        productName = {selectedProduct}
        /> 
        : null}
        {selectedItemType === 'workflow' ?
         <Workflowview
         clientNr = {clientNr}
         explorerId = {explorerId}
         productName = {selectedProduct}
         name = {selectedWork}
       /> 
         : null} 

        {selectedItemType === 'api' ?
         <ApiTerminal
         clientNr = {clientNr}
         explorerId = {explorerId}
         productName = {selectedProduct}
         workflowName = {selectedWork}
         taskId = {selectedTaskId}
       /> 
         : null} 
        </div>
      </div>
      </div>
  );
  
};

export default ProductTree;
