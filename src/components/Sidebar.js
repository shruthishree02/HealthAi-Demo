import React, { useEffect, useState } from "react";
import RiveComponent from "@rive-app/react-canvas";
import logoAnim from "../assets/logo_anim.riv";
import "./Sidebar.css";

function Sidebar() {
  const [query, setQuery] = useState(""); // State for Natural Language Query
  const [graphqlQuery, setGraphqlQuery] = useState(""); // State for GraphQL query
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

  // Function to handle suggestion clicks (pre-fills the natural language query box)
  const handleSuggestionClick = (text, generatedContent) => {
    setQuery(text); // Update the natural language query box
    setGeneratedQuery(generatedContent); // Store the content to be used when "Generate" is clicked
  };

  // Function to handle Generate button click
  const handleGenerateClick = () => {
    setGraphqlQuery(generatedQuery); // Display the generated content in the GraphQL query box
  };

  useEffect(() => {
    const graphqlTextarea = document.querySelector(".graphql .query-textarea");
    autoResize(graphqlTextarea);
  }, [graphqlQuery]); // Resize when the GraphQL query content changes

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
        search for supplements with specific health effects based on user-written
        reviews. The demo uses generative search to further enhance the results by
        providing product and review summaries.
      </p>
      <p className="disclaimer">
        HealthSearch is NOT intended to give any health advice, all results are
        purely based on user-written reviews. HealthSearch is a technical
        demonstration and presents a proof of concept for one of many possible use
        cases for Weaviate.
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
          <button
            onClick={() =>
              handleSuggestionClick(
                "Helpful for joint pain",
                `{
  Get {
    Healthsearch_Product(
    autocut: 3
      hybrid: {query: "Helpful for joint pain"}
    ) {
      name
      brand
      ingredients
      reviews
      image
      rating
      description
      summary
      effects
      _additional {
        id
        score
      }
    }
  }
}

# Query with generative module 

{
  Get {
    Healthsearch_Product(
    limit: 5
      hybrid: {query: "Helpful for joint pain"}
    ) {
      ingredients
      description
      summary
      
      _additional {
        generate(
          groupedResult: {
            task: "Summarize products based on this query: helpful for joint pain"
          }
        ) {
          groupedResult
          error
        }
        id
        distance
      }
    }
  }
}`
              )
            }
          >
            Helpful for joint pain
          </button>
          <button
            onClick={() =>
              handleSuggestionClick(
                "Products for sleep from the Now Foods brand",
                `{
  Get {
    Healthsearch_Product(
    autocut: 3
      hybrid: {query: "sleep"}
      where: {
        path: ["brand"],
        operator: Equal,
        valueString: "Now Foods"
      }
    ) {
      name
      brand
      ingredients
      reviews
      image
      rating
      description
      summary
      effects
      _additional {
        id
        score
      }
    }
  }
}

# Query with generative module 

{
  Get {
    Healthsearch_Product(
    limit: 5
      hybrid: {query: "sleep"}
      where: {
        path: ["brand"],
        operator: Equal,
        valueString: "Now Foods"
      }
    ) {
      brand
      ingredients
      description
      summary
      
      _additional {
        generate(
          groupedResult: {
            task: "Summarize products based on this query: products for sleep from the now foods brand"
          }
        ) {
          groupedResult
          error
        }
        id
        distance
      }
    }
  }
}`
              )
            }
          >
            Products for sleep from the Now Foods brand
          </button>
          <button
            onClick={() =>
              handleSuggestionClick(
                "Best rated product for energy",
                `{
  Get {
    Healthsearch_Product(
      autocut: 3
      nearText: {concepts: ["energy"]}
      sort: [{
        path: ["rating"],
        order: desc
      }]
    ) {
      name
      brand
      ingredients
      reviews
      image
      rating
      description
      summary
      effects
      _additional {
        id
        score
      }
    }
  }
}

# Query with generative module 

{
  Get {
    Healthsearch_Product(
      limit: 5
      nearText: {concepts: ["energy"]}
      sort: [{
        path: ["rating"],
        order: desc
      }]
    ) {
      ingredients
      rating
      description
      summary
      
      _additional {
        generate(
          groupedResult: {
            task: "Summarize products based on this query: best rated product for energy"
          }
        ) {
          groupedResult
          error
        }
        id
        distance
      }
    }
  }
}`
              )
            }
          >
            Best rated product for energy
          </button>
        </div>
        <div className="actions">
          <p className="saved-queries">Saved queries: 1</p>
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
          placeholder=""
        />
        <div className="actions">
          <button className="copy-button">📋 Copy to clipboard</button>
        </div>
      </div>

      <p className="total-requests">Total Requests: 98</p>
    </div>
  );
}

export default Sidebar;
