import React, { useEffect, useState } from "react";
import RiveComponent from "@rive-app/react-canvas";
import logoAnim from "../assets/logo_anim.riv";
import { toast } from "react-toastify"; // Import toast
import "./Sidebar.css";

function Sidebar({ graphqlQuery, onGenerate }) {
  const [query, setQuery] = useState(""); // State for Natural Language Query
  const [generatedQuery, setGeneratedQuery] = useState(""); // State for Generated GraphQL content

  useEffect(() => {
    const container = document.querySelector(".left-section");
    if (container) container.scrollTop = 0;
  }, []);

  // Automatically resize textarea to fit content
  const autoResize = (element) => {
    if (element) {
      element.style.height = "auto"; // Reset height to auto
      element.style.height = `${element.scrollHeight}px`; // Adjust height to match content
    }
  };

  // Function to handle suggestion clicks
  const handleSuggestionClick = (text) => {
    setQuery(text); // Update the natural language query box
    const tempGeneratedQuery = `{
      Get {
        Healthsearch_Product(
          limit: 5
          hybrid: { query: "${text}" }
        ) {
          ingredients
          description
          summary
          _additional {
            generate(
              groupedResult: { task: "Summarize products based on this query: ${text}" }
            ) {
              groupedResult
              error
            }
            id
            distance
          }
        }
      }
    }`;
    setGeneratedQuery(tempGeneratedQuery); // Pre-generate the GraphQL query but don't pass it to the parent
  };

  // Function to handle Generate button click
  const handleGenerateClick = () => {
    let response = "";

    // Set the response based on the selected query
    if (query === "Products for sleep from the Now Foods brand") {
      response = "🛰️ RETRIEVED FROM CACHE: Now Foods offers a range of products for sleep, including Melatonin capsules in various strengths and forms. These products are designed to help regulate sleep/wake cycles, promote relaxation, and support overall sleep quality. In addition, Now Foods also offers Inositol Powder, which can help quiet the mind and eliminate racing thoughts to improve sleep. GABA tablets are also available to promote relaxation and ease nervous tension, potentially benefiting those with anxiety or sleep issues. Overall, Now Foods products for sleep aim to provide natural support for a restful night's sleep.";
    } else if (query === "Helpful for joint pain") {
      response = "🛰️ RETRIEVED FROM CACHE: 1. Solgar Resveratrol, 250 mg, 60 Softgels: This product contains resveratrol, a natural polyphenol with powerful antioxidant properties that help fight cell-damaging free radicals. It has been reported to have positive effects on joint pain. 2. Nature's Bounty Ginger Root, 550 mg, 100 Capsules: This product supports digestive health and helps with occasional motion sickness. It has been reported to have positive effects on joint pain and digestion. 3. Gaia Herbs TurmericBoost, Uplift, 5.29 oz (150 g): This turmeric product supports a joyful outlook on life and promotes a healthy inflammatory response. It has been reported to have positive effects on joint pain. 4. Doctor's Best Glucosamine Chondroitin MSM with OptiMSM, 120 Veggie Caps: This product provides nutrients that support healthy joints and connective tissues. It has been highly recommended for its health benefits, especially for joint pain relief. 5. Nature's Plus Advanced Therapeutics Glucosamine Chondroitin MSM Ultra Rx-Joint Cream, 4 fl oz (118 ml): This topical formula combines glucosamine, chondroitin, and MSM for maximum benefits. It has been reported to have positive effects on muscle pain, arthritis, and joint discomfort.";
    } else if ( query === "Best rated product for energy") { 
      response = "🛰️ RETRIEVED FROM CACHE: Based on the query for the best rated product for energy, the following products were summarized: 1. Solaray Once Daily High Energy, Multi-Vita-Min, Iron Free, 120 Capsules: Formulated with two-stage, timed-release technology containing Vitamin C, Thiamine, Riboflavin, Niacinamide, and Vitamin B-6. Customers reported that the vitamins provided much needed energy at an excellent price. 2. 21st Century Sentry Senior, Multivitamin & Multimineral Supplement, Adults 50+, 125 Tablets: A balanced formula for active adults 50+ with complete antioxidant support. Users experienced great energy and increased productivity after taking these vitamins. 3. Quality of Life Labs CoQ10-SR, 100 mg, 30 Vegicaps: Contains MicroActive CoQ10 for sustained release over 24 hours and enhanced absorption. Users felt an increase in energy and found it to be the best Q10 supplement available. 4. Guayaki Organic Yerba Mate Shot, Lime Tangerine, 2 fl oz (59 ml): A high energy infusion made from Yerba Mate and other natural ingredients. Provides sustained and balanced energy without frequent restroom breaks, although some users had negative experiences with purchasing from iHerb.com." ;
    }

    // Call the onGenerate function with the generated query and response
    onGenerate(generatedQuery, response);
  };

    // Function to copy the response to clipboard
    const copyToClipboard = () => {
      navigator.clipboard.writeText(graphqlQuery).then(() => {
        toast.success("Response copied to clipboard!", {
          className: 'custom-toast-success' // Apply custom success class
        });
      }).catch(err => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy response.", {
          className: 'custom-toast-error' // Apply custom error class
        });
      });
    };

  useEffect(() => {
    const graphqlTextarea = document.querySelector(".graphql .query-textarea");
    autoResize(graphqlTextarea);
  }, [graphqlQuery]);

 
  return (
    <div className="left-section">
      <div className="logo-container">
        <RiveComponent src={logoAnim} className="logo-animation" />
      </div>
      <h1 className="title">
        <span className="brand"></span>
      </h1>
      <p className="description">
        Welcome to HealthSearch! Convert natural language to a GraphQL query to
        search for supplements with specific health effects based on
        user-written reviews. The demo uses generative search to further enhance
        the results by providing product and review summaries.
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

      {/* Natural Language Query Box */}
      <div className="query-box natural-language">
        <div className="query-header">
          <span className="icon"></span>
          <h3> 💬 Natural Language Query</h3>
        </div>
        <textarea
          className="query-textarea"
          placeholder="Helpful for joint pain"
          value={query} // Displays the natural language query
          readOnly
        />
        <div className="suggestions">
          <button onClick={() => handleSuggestionClick("Helpful for joint pain")}>
            Helpful for joint pain
          </button>
          <button
            onClick={() =>
              handleSuggestionClick(
                "Products for sleep from the Now Foods brand"
              )
            }
          >
            Products for sleep from the Now Foods brand
          </button>
          <button
            onClick={() => handleSuggestionClick("Best rated product for energy")}
          >
            Best rated product for energy
          </button>
        </div>
        <div className="actions">
          <button className="generate-button" onClick={handleGenerateClick}>
            Generate
          </button>
        </div>
      </div>

      {/* GraphQL Query Box */}
      <div className="query-box graphql">
        <div className="query-header">
          <span className="icon"></span>
          <h3>📝 GraphQL Query</h3>
        </div>
        <textarea
          className="query-textarea"
          value={graphqlQuery} // Displays the GraphQL query
          readOnly
          placeholder="Generated GraphQL query will appear here"
        />
        <div className="actions">
        <button className="copy-button" onClick={copyToClipboard}>
          📋 Copy Summary to Clipboard
        </button>
        </div>
      </div>
      <p className="total-requests">Total Requests: 98</p>
    </div>
  );
}

export default Sidebar;
