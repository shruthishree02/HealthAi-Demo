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
      }, 30); // Adjust the speed of letter display here
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

  const suggestedProducts = [
    {
      title: "Doctor's Best",
      name: "Glucosamine Chondroitin MSM with OptiMSM, 120 Veggie Caps",
      image: require("../assets/JPp1.png"),
      rating: "⭐⭐⭐⭐⭐",
      reviews: 68,
     summary: "This product is highly recommended for its health benefits. It keeps the aches and problems away, especially for joints. Users have reported feeling much better and experiencing less pain after taking this product regularly. It works wonders for arthritis and osteo in the neck. The FDA even recommends this product for its effectiveness. Overall, it is a great product for improving joint health and providing relief from pain. Highly recommended for those with aching knees or arthrosis of the lower extremities."
    },
    {
      title: "Badger Company",
      name: "Sore Joint Rub, Arnica Blend, 2 oz (56 g)",
      image: require("../assets/JPp2.png"),
      rating: "⭐⭐⭐⭐",
      reviews: 21,
      summary: "This product is highly recommended for mild joint pains. It helps the muscles recover faster and decreases pain. The natural oils in this product work with your body to promote recovery. However, the arnica content may not be very high. It is not suitable for sensitive skin as it has a strong scent and takes a long time to absorb. The packaging is cute and handy. This balm is effective for sore and aching muscles, including arthritic pain. Overall, customers are happy with this product and find it beneficial for their health."
    },
    {
      title: "Nature's Plus",
      name: "Advanced Therapeutics, Glucosamine Chondroitin MSM, Ultra Rx-Joint Cream, 4 fl oz (118 ml)",
      image: require("../assets/JPp3.png"),
      rating: "⭐⭐⭐⭐",
      reviews: 19,
      summary: "This joint cream is very effective and does not cause any itching. My mother and I both found relief from knee pain after using it. I even recommended it to my mother's friend and sister, who also found it to be helpful. It works well for joint pain and has a pleasant scent. However, some people with allergies may not be able to use it on their face. Overall, it is a great product for relieving pain and has become a staple in my family for arthritis and muscle pain. Unfortunately, it did not provide any relief for various knee conditions as promised. Despite this setback, I highly recommend it for general joint pain and arthritis."
    }
  ];


  return (
    <div className="right-section">
      {/* Displaying GraphQL Query */}
      <div className="summary-box">
        <h3>🤖 Generated Product Summary</h3>
        <textarea
          value={displayedResponse} // Use displayedResponse for letter-by-letter effect
          readOnly
          className="response-textarea"
          placeholder="Welcome to Healthsearch!"
          ref={textareaRef} // Reference for auto-resizing
          style={{ height: "auto" }} // Ensure it can resize
        />
      </div>

        {/* Suggestion Box - Display only when there's a response */}
    {response && (
      <div className="suggestion-box">
        <span>💡 Suggestion:</span> If this summary isn't accurate, try refining the query for better results.
      </div>
    )}

        {/* Suggested Products Section */}
      <div className="suggested-products-container">
        {suggestedProducts.map((product, index) => (
          <div key={index} className="product-card">
            <h4 className="product-title">{product.title}</h4>
            <p className="product-name">{product.name}</p>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="rating">{product.rating} ({product.reviews} reviews)</div>
            <div className="product-summary">
              <p><strong>Generated Review Summary:</strong></p>
              <textarea readOnly className='summary-textarea' value={product.summary}></textarea>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default MainContent;