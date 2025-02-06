import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Popup from "./components/Popup";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productOptions = {
  "Helpful for joint pain": [
    { name: "Awesome Product 1", image: "product1.jpg", rating: 4.5, reviews: 150, summary: "This is an amazing product that will help you achieve your goals." },
    { name: "Awesome Product 2", image: "product2.jpg", rating: 4.7, reviews: 200, summary: "Highly recommended for its quality and effectiveness." },
    { name: "Awesome Product 3", image: "product3.jpg", rating: 4.2, reviews: 120, summary: "Great quality at an affordable price." },
  ],
  "Products for sleep from the Now Foods brand": [
    { name: "Awesome Product 4", image: "product4.jpg", rating: 4.8, reviews: 300, summary: "Highly rated with exceptional reviews." },
    { name: "Awesome Product 5", image: "product5.jpg", rating: 4.6, reviews: 250, summary: "A must-have for daily use." },
  ],
  "Best rated product for energy": [
    { name: "Awesome Product 6", image: "product6.jpg", rating: 4.1, reviews: 100, summary: "Great choice for durability and efficiency." },
    { name: "Awesome Product 7", image: "product7.jpg", rating: 4.4, reviews: 180, summary: "Well-balanced product with solid features." },
  ],
};

function App() {
  const [graphqlQuery, setGraphqlQuery] = useState("");
  const [response, setResponse] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);

  const handleGenerate = (generatedQuery, generatedResponse) => {
    setGraphqlQuery(generatedQuery);
    setResponse(generatedResponse);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
  };

  const handleGenerateClick = () => {
    if (selectedSuggestion) {
      setDisplayProducts(productOptions[selectedSuggestion]);
    }
  };

  // Pass the function onSelectOption to Sidebar here
  const handleSelectOption = (products) => {
    setSelectedProducts(products);
  };

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {showPopup && <Popup onClose={handleClosePopup} />}

      <Sidebar
        graphqlQuery={graphqlQuery}
        onGenerate={handleGenerate}
        response={response}
        onSelectOption={handleSelectOption} // Make sure it's passed
        onSuggestionClick={handleSuggestionClick}
        onGenerateClick={handleGenerateClick}
      />

      <MainContent
        query={graphqlQuery}
        response={response}
        selectedOption={selectedOption}
        products={displayProducts} // Correct usage of `products`
        selectedProducts={displayProducts} // Correct usage of `selectedProducts`
      />

      <ToastContainer />
    </div>
  );
}

export default App;

