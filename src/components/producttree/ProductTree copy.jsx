import React, { useState, useEffect } from 'react';
import "./producttree.css" ;
import axios from "axios";

const TreeNode = ({ label, children, isChild }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`tree-node ${isChild ? 'child-node' : ''}`}>
      <span onClick={toggleCollapse}>
        {collapsed ? '▶' : '▼'} {label}
      </span>
      <div style={{ display: collapsed ? 'none' : 'block' }}>
        {children}
      </div>
    </div>
  );
};

const ProductTree = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the initial products using an API call
    // Replace this with your actual API endpoint
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    
    try {
      const mybody = 
      {
        clientNr: "Pockyt",
        explorerId: "1"
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
      <TreeNode key={index} label={node.name} isChild={isChild}>
        {node.workflows.map((workflow, wIndex) => (
          <div key={wIndex} className="workflow">{workflow}</div>
        ))}
      </TreeNode>
    ));
  };

  return (
    <div className="collapsible-tree">
      {renderTree(products, false)}
    </div>
  );
};


export default ProductTree;

