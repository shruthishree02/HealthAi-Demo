import React, { useState } from "react";
import "./Popup.css"; // Optional: Add styles for the popup

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Please Note</h2>
        <p>
        Healthsearch is NOT intended to give any health advice. All results are purely based on the content of user-written reviews. Healthsearch is a technical demonstration that presents a proof of concept for one of many usecases with Weaviate. Please ask a medical professional before taking any supplements for your condition.
        </p>
        <button onClick={onClose}>I Understand</button>
      </div>
    </div>
  );
};

export default Popup;

  
