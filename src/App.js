import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Popup from "./components/Popup";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getImagePath = (imageName) => require(`./assets/${imageName}`);

const productOptions = {
  "Helpful for joint pain": [
    { name: "Doctor's Best", image: getImagePath("JPp1.png"), rating: 4.5, reviews: 150, summary: "Glucosamine Chondroitin MSM with OptiMSM, 120 Veggie Caps",intel:"This product is highly recommended for its health benefits. It keeps the aches and problems away, especially for joints. Users have reported feeling much better and experiencing less pain after taking this product regularly. It works wonders for arthritis and osteo in the neck. The FDA even recommends this product for its effectiveness. Overall, it is a great product for improving joint health and providing relief from pain. Highly recommended for those with aching knees or arthrosis of the lower extremities." },
    { name: "Badger Company", image: getImagePath("JPp2.png"), rating: 4.1, reviews: 200, summary: "Sore Joint Rub, Arnica Blend, 2 oz (56 g)",intel:"This product is highly recommended for mild joint pains. It helps the muscles recover faster and decreases pain. The natural oils in this product work with your body to promote recovery. However, the arnica content may not be very high. It is not suitable for sensitive skin as it has a strong scent and takes a long time to absorb. The packaging is cute and handy. This balm is effective for sore and aching muscles, including arthritic pain. Overall, customers are happy with this product and find it beneficial for their health." },
    { name: "Nature's Plus", image: getImagePath("JPp3.png"), rating: 4.2, reviews: 120, summary: "Advanced Therapeutics, Glucosamine Chondroitin MSM, Ultra Rx-Joint Cream, 4 fl oz (118 ml)",intel:"This joint cream is very effective and does not cause any itching. My mother and I both found relief from knee pain after using it. I even recommended it to my mother's friend and sister, who also found it to be helpful. It works well for joint pain and has a pleasant scent. However, some people with allergies may not be able to use it on their face. Overall, it is a great product for relieving pain and has become a staple in my family for arthritis and muscle pain. Unfortunately, it did not provide any relief for various knee conditions as promised. Despite this setback, I highly recommend it for general joint pain and arthritis." },
  ],
  "Products for sleep from the Now Foods brand": [
    { name: "Now Foods", image: getImagePath("S1.png"), rating: 4.8, reviews: 300, summary: "Melatonin, 3 mg, 180 Capsules",intel:"This product is excellent for falling asleep easier. It is important to note that the doses in these capsules are higher than necessary for optimal use. To use this product effectively, take 30-60 minutes before going to bed. Open 1 capsule and take the amount of powder that would fill the smaller part of the capsule, then swallow with some liquid. It is also possible to mix the powder into water, but there may be residue left. Please remember that this product is not a sleep medication, but rather a natural sleep hormone that signals your body it is time to sleep. It is important to take other steps such as reducing exposure to blue lights and avoiding caffeine or other stimulants. Overall, this product works well for falling asleep and is cost-effective. It does not affect the duration of sleep and works best when taken with magnesium citrate. The soft effect of this product gently puts you to sleep. However, if you are a deep sleeper, be cautious as it may make you sleep even deeper. Additionally, it is recommended to use this product along with theanine serine for better sleep" },
    { name: "Now Foods", image: getImagePath("S2.png"), rating: 4.6, reviews: 250, summary: "Melatonin, 3 mg, 60 Capsules",intel:"Melatonin has helped me with my sleeplessness from cluster headaches. It has also helped me sleep more soundly between the headaches. It is a good product that helps me fall asleep. I gave it to my friend who had insomnia and it helped her sleep well. However, it was too strong for me and gave me terrible nightmares. If you suffer from agitated sleep and night sweats, be careful. Melatonin also works well for my elderly dog who had sleep trouble. It is also effective for my acid reflux. It doesn't give me freaky dreams like other melatonin capsules. This brand is my favorite. It is super effective and gives me a natural sleepy feeling. I still wake up in the middle of the night, but it doesn't turn me into a completely comatose zombie." },
    { name: "Now Foods", image: getImagePath("S3.png"), rating: 4.2, reviews: 120, summary: "Melatonin, 5 mg, 180 Veg Capsules",intel:"This product caused a headache in the morning, but it works like a charm for getting a good night's sleep with no drowsiness the next morning. It works best when taken 30-45 minutes before bedtime. It has helped me sleep so well that I can't go past 11 pm now. I used to have trouble sleeping before trying this product, but now I have great sleep and feel more rested. However, it had no effect on me and didn't help me get to sleep, even when exceeding the recommended dose. I am disappointed and will not repurchase. I will try liquid Melatonin next. After using these tablets for three weeks, I have had blissful and deep restorative sleep. I feel reborn! I also use a self-hypnosis CD as an adjunct, which has been helpful in reducing my sleep deprivation anxiety. Overall, I recommend trying this product for a good night's sleep." },

  ],
  "Best rated product for energy": [
    { name: "Paradise Herbs", image: getImagePath("PE1.png"), rating: 4.1, reviews: 100, summary: "ORAC-Energy Greens, 15 Packets, 6 g Each",intel:"The Energy Greens supplement is great for traveling as it provides me with the energy I need to stay alert in the afternoon. It is the best all-in-one greens supplement on the market, with mostly organic ingredients that have high nutritional value. I am energized all day long and feel great after taking it. Mixing it in my morning protein smoothie helps me stay energized throughout the entire day. Overall, it is a great product that I highly recommend" },
    { name: "Optimum Nutrition", image: getImagePath("PE2.png"), rating: 4.4, reviews: 180, summary: "Essential Amin.O. Energy, Green Apple, 9.5 oz (270 g)",intel:"Essential AmiN.O. Energy is a great product for those who want an energy boost, without the creatine and other extras found in pre-workout supplements. It provides a subtle energy boost and has a delicious green apple flavor. Reviewers have reported increased focus at work and improved recovery after exercise. Additionally, it is said to help combat fatigue throughout the morning and day" },
    { name: "No Brand", image: getImagePath("PE3.png"), reviews: 0, summary: "No Product Name",intel:"N/A" },

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

