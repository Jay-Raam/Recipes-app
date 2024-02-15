import React, { useState, useEffect } from "react";
import "./api.css";

function RecipeApp() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // State variable for loading

  const API_URL = "https://www.themealdb.com/api/json/v1/1";

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await fetch(`${API_URL}/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    } finally {
      setLoading(false); // Set loading to false after data fetching is done
    }
  };

  useEffect(() => {
    setDisplayedRecipes(recipes.slice(0, 5));
  }, [recipes]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="text"
            className="input"
            value={query}
            onChange={handleChange}
            placeholder="Search Food..."
          />
          <div className="highlight"></div>
        </div>

        <button type="submit" className="btn">
          Search
        </button>
      </form>
      <div className="flex-2">
        {loading &&      <div>
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
</div>}
        <div className="recipes">
          {displayedRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipes-continer">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="gal-002"
              />
              <h2 className="gal-001">{recipe.strMeal}</h2>
              <div
                className="gal-003"
                dangerouslySetInnerHTML={{ __html: recipe.strInstructions }}
              ></div>
            </div>
          ))}
        </div>
        {recipes.length > 5 && (
          <button
            onClick={() =>
              setDisplayedRecipes(recipes.slice(0, displayedRecipes.length + 5))
            }
            className="gal-004"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeApp;
