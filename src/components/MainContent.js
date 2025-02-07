import React, { useEffect, useState, useRef } from "react";
import "./MainContent.css"; // Import the specific CSS for MainContent

function MainContent({ query, response, selectedOption, products }) {
  const [displayedResponse, setDisplayedResponse] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (response) {
      setDisplayedResponse("");
      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [response]);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };


  useEffect(() => {
    autoResize();
  }, [displayedResponse]);

  return (
    <div className="right-section">
      <div className="summary-box">
        <h3>🤖 Generated Product Summary</h3>
        <textarea
          value={displayedResponse}
          readOnly
          className="response-textarea"
          placeholder="Welcome to Healthsearch!"
          ref={textareaRef}
          style={{ height: "auto" }}
        />
      </div>

      {response && (
        <div className="suggestion-box">
          <span>💡 Suggestion:</span> If this summary isn't accurate, try refining the query for better results.
        </div>
      )}

  {/* Only show products if products array is populated */}
  <div className="product-list">
        {products.length > 0 && products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image"/>
            <div className="product-info">
                <h4>{product.name}</h4>
            <p>{product.summary}</p>
            <textarea 
                  value={product.intel}
                  readOnly
                  className="summary-textarea"
                />
              
            <p>⭐⭐⭐⭐⭐ {product.rating} ({product.reviews} reviews)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
