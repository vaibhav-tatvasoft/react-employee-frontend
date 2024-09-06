// src/ExpandableSection.js
import React, { useState } from "react";
import "./SwaggerLikeUI.css";
import APIElement from "./APIElement";

const SwaggerLikeUI = () => {
  const [showNewComponent, setShowNewComponent] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setShowNewComponent(true); // Set state to true to show the new component
  };

  return (
    <div className="swagger-like-container">
      <header className="swagger-like-header">
        <h1>API Documentation</h1>
        <h2>Endpoint: [API Endpoint Name]</h2>
        <h2>Method: [HTTP Method]</h2>
      </header>
      <body>
        <div className="expandable-container">
          <div className="expandable-item">
            <button className="expandable-header" onClick={handleButtonClick}>
              {showNewComponent && <APIElement />}
            </button>
          </div>
        </div>
      </body>
    </div>
  );
};

export default SwaggerLikeUI;
