import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Loading from "./Loading";

function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isDarkMode } = useTheme();

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
  ];

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://receipe-app-pcvs.onrender.com/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loading) {
    return <Loading />;
  }

  const handleEditClick = (e, id) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="search-container">
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <span className="filter-label">Category:</span>
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe._id}`}
            key={recipe._id}
            className="recipe-card"
          >
            <div className="recipe-card-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-category">{recipe.category}</p>
              <p className="recipe-time">{recipe.cookingTime} minutes</p>
              <div className="recipe-buttons">
                <Link
                  to={`/recipe/${recipe._id}`}
                  className="btn-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Details
                </Link>
                <button
                  onClick={(e) => handleEditClick(e, recipe._id)}
                  className="btn-secondary"
                >
                  Edit
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
