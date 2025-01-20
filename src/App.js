import React, { useState } from "react";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import MainContent from "./components/MainContent"; // Import MainContent component
import Popup from "./components/Popup"; // Import Popup component
import "./App.css"; // Import the global CSS
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function App() {
  const [graphqlQuery, setGraphqlQuery] = useState(""); // State for GraphQL query
  const [response, setResponse] = useState(""); // State for generated response
  const [showPopup, setShowPopup] = useState(true); // State to handle the visibility of the popup

  // Function to handle the generated GraphQL query and response from Sidebar
  const handleGenerate = (generatedQuery, generatedResponse) => {
    setGraphqlQuery(generatedQuery); // Update the GraphQL query state
    setResponse(generatedResponse); // Update the response state
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false); // Set the popup visibility to false
  };

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {/* Render the popup if showPopup is true */}
      {showPopup && <Popup onClose={handleClosePopup} />}

      {/* Left Section (Sidebar) */}
      <Sidebar graphqlQuery={graphqlQuery} onGenerate={handleGenerate} response={response} />

      {/* Right Section (Main Content) */}
      <MainContent query={graphqlQuery} response={response} />

      
      {/* Toast Container for notifications */}
      <ToastContainer />
      
    </div>
    
  );
}

export default App;
