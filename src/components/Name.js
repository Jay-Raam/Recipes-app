import React, { useState, useEffect } from "react";
import "./name.css";

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [displayedRecipes, setDisplayedRecipes] = useState(10);

  useEffect(() => {
    const fetchRecipes = async () => {
      const API_KEY = "e75d81a9051f44f3a69dfaf958df8d23";
      const API_URL = `https://api.spoonacular.com/recipes/random?number=30&apiKey=${API_KEY}`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.recipes);
        setRecipes(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle click on image
  const handleImageClick = (recipe) => {
    setSelectedRecipe(recipe); 
  };

  // Function to close the recipe details modal
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  // Function to handle "Show More" button click
  const handleShowMore = () => {
    setDisplayedRecipes(displayedRecipes + 10);
  };


  return (
    <div className="container">
      {loading ? (
        <div>
  <svg className="loader" viewBox="0 0 48 30" width="48px" height="30px">
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
    <g transform="translate(9.5,19)">
      <circle className="loader_tire" r="9" strokeDasharray="56.549 56.549"></circle>
      <g className="loader_spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
        <circle className="loader_spokes" r="5"></circle>
        <circle className="loader_spokes" r="5" transform="rotate(180,0,0)"></circle>
      </g>
    </g>
    <g transform="translate(24,19)">
      <g className="loader_pedals-spin" strokeDasharray="25.133 25.133" strokeDashoffset="-21.991" transform="rotate(67.5,0,0)">
        <circle className="loader_pedals" r="4"></circle>
        <circle className="loader_pedals" r="4" transform="rotate(180,0,0)"></circle>
      </g>
    </g>
    <g transform="translate(38.5,19)">
      <circle className="loader_tire" r="9" strokeDasharray="56.549 56.549"></circle>
      <g className="loader_spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
        <circle className="loader_spokes" r="5"></circle>
        <circle className="loader_spokes" r="5" transform="rotate(180,0,0)"></circle>
      </g>
    </g>
    <polyline className="loader_seat" points="14 3,18 3" strokeDasharray="5 5"></polyline>
    <polyline className="loader_body" points="16 3,24 19,9.5 19,18 8,34 7,24 19" strokeDasharray="79 79"></polyline>
    <path className="loader_handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" strokeDasharray="10 10"></path>
    <polyline className="loader_front" points="32.5 2,38.5 19" strokeDasharray="19 19"></polyline>
  </g>
</svg>
</div>
      ) : (
        <div className="flex">
          <ul className="gal-1">  
            {recipes.slice(0, displayedRecipes).map((recipe, index) => (
              <li key={index} className="gal-2">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="gal-3"
                  onClick={() => handleImageClick(recipe)}
                />
                <h2 className="gal-5" onClick={() => handleImageClick(recipe)}>{recipe.title}</h2>
              </li>
            ))}
          </ul>
          {/* Modal for displaying recipe details */}
          {selectedRecipe && (
            <div className="modal">
              <div className="modal-container">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2 className="gal-01">#{selectedRecipe.title}</h2>
                <div className="gal-03" dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></div>
                <div className="gal-03" dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}></div>
              </div>
            </div>
          )}
        </div>
      )}
       {recipes.length > displayedRecipes && (
            <button className="gal-004" onClick={handleShowMore}>
              Show More
            </button>
          )}
    </div>
  );
}

export default RecipeApp;
