import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import { useTheme } from "../context/ThemeContext";
import { recipeAPI } from "../api/api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { isDarkMode } = useTheme();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    cookingTime: "",
  });
  const [error, setError] = useState("");

  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedRecipe = await recipeAPI.getRecipe(id);
      setRecipe({
        ...fetchedRecipe,
        ingredients: fetchedRecipe.ingredients.join(", "),
      });
    } catch (error) {
      setError("Error fetching recipe");
      toast.error("Error loading recipe");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const formattedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
        cookingTime: parseInt(recipe.cookingTime),
      };

      await recipeAPI.updateRecipe(id, formattedRecipe);
      toast.success("Recipe updated successfully");
      setTimeout(() => {
        navigate(`/recipe/${id}`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating recipe");
      toast.error("Error updating recipe");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
      <div
        className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Edit Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Recipe Title
            </label>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              className={`input-field w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              required
            />
          </div>

          <div className="form-group">
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Ingredients (comma-separated)
            </label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              className={`input-field w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              rows="4"
              required
              placeholder="Enter ingredients separated by commas"
            />
          </div>

          <div className="form-group">
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Cooking Instructions
            </label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              className={`input-field w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <select
              name="category"
              value={recipe.category}
              onChange={handleChange}
              className={`input-field w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              required
            >
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div className="form-group">
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className={`input-field w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`w-full py-2 px-4 rounded font-semibold relative ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } ${updating ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {updating ? (
              <>
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                </span>
                <span className="opacity-0">Update Recipe</span>
              </>
            ) : (
              "Update Recipe"
            )}
          </button>
        </form>

        {error && (
          <div
            className={`mt-4 p-4 rounded ${
              isDarkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"
            }`}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditRecipe;
