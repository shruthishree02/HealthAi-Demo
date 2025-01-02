import React from "react";
import  RiveComponent  from "@rive-app/react-canvas";  // Named import
import logoAnim from "../assets/logo_anim.riv";  // Correct path
import weaviateIcon from "../assets/weaviate-icon.png";  // Icon paths
import githubIcon from "../assets/github-icon.png";  // Icon paths
import "./Sidebar.css";  // CSS for sidebar

function Sidebar() {
  return (
    <div className="left-section">
      {/* Rive Animation */}
      <div className="logo-container">
        <RiveComponent src={logoAnim} className="logo-animation" />
      </div>

      <h1 className="title">
        <span className="brand"></span> 
      </h1>
      <p className="description">
        Welcome to HealthSearch! Convert natural language to a GraphQL query to search
        for supplements with specific health effects based on user-written reviews.
        The demo uses generative search to further enhance the results by providing
        product and review summaries.
      </p>
      <p className="disclaimer">
        HealthSearch is NOT intended to give any health advice, all results are
        purely based on user-written reviews. HealthSearch is a technical
        demonstration and presents a proof of concept for one of many possible
        use cases for Weaviate.
      </p>

      <div className="icons">
        <div className="icon weaviate-icon" />
        <div className="icon github-icon" />
      </div>

      <div className="query-box natural-language">
        <div className="query-header">

          <span className="icon"></span>
          <h3>Natural Language Query</h3>
        </div>
        <textarea
          className="query-textarea"
          placeholder="Helpful for joint pain"
        />
        <div className="suggestions">
          <button>Helpful for joint pain</button>
          <button>Products for sleep from the Now Foods brand</button>
          <button>Best rated product for energy</button>
        </div>
        <div className="actions">
          <p className="saved-queries">Saved queries: 1</p>
          <button className="generate-button">Generate</button>
        </div>
      </div>

       {/* GraphQL Query Box */}
       <div className="query-box graphql">
        <div className="query-header">
          <span className="icon"></span>
          <h3>GraphQL Query</h3>
        </div>
        <textarea className="query-textarea" placeholder="" />
        <div className="actions">
          <button className="copy-button">Copy to clipboard</button>
        </div>
      </div>
{/* Total Requests */}
      <p className="total-requests">Total Requests: 98</p>

    </div>
  );
}

export default Sidebar;



