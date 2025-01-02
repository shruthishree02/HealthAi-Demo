import React, { useState } from "react";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import MainContent from "./components/MainContent"; // Import MainContent component
import "./App.css"; // Import the global CSS
import Popup from "./components/Popup"; // Import Popup component

function App() {
  // State to handle the visibility of the popup
  const [showPopup, setShowPopup] = useState(true);

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      {/* Render the popup if showPopup is true */}
      {showPopup && <Popup onClose={handleClosePopup} />}

      {/* Left Section (Sidebar) */}
      <Sidebar />

      {/* Right Section (Main Content) */}
      <MainContent />
    </div>
  );
}

export default App;


