import React, { useEffect, useState, useRef } from "react";
import "./MainContent.css"; // Import the specific CSS for MainContent

function MainContent({ query, response }) {
  const [displayedResponse, setDisplayedResponse] = useState("");
  const textareaRef = useRef(null); // Reference for the response textarea

  useEffect(() => {
    if (response) {
      setDisplayedResponse(""); // Reset displayed response
      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust the speed of letter display here
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [response]);

  // Function to auto-resize the textarea
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to match content
    }
  };

  // Call autoResize whenever displayedResponse changes
  useEffect(() => {
    autoResize();
  }, [displayedResponse]);

  return (
    <div className="right-section">
      {/* Displaying GraphQL Query */}
      <div className="summary-box">
        <h3>🤖 Generated Product Summary</h3>
        <textarea
          value={displayedResponse} // Use displayedResponse for letter-by-letter effect
          readOnly
          className="response-textarea"
          placeholder="Generated product summary will appear here"
          ref={textareaRef} // Reference for auto-resizing
          style={{ height: "auto" }} // Ensure it can resize
        />
      </div>
    </div>
  );
}

export default MainContent;