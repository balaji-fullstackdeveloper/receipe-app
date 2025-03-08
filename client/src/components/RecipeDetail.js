import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import { useTheme } from "../context/ThemeContext";
import { recipeAPI } from "../api/api";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { isDarkMode } = useTheme();

  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedRecipe = await recipeAPI.getRecipe(id);
      setRecipe(fetchedRecipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      toast.error("Error loading recipe details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        setDeleting(true);
        await axios.delete(`https://receipe-app-pcvs.onrender.com/api/recipes/${id}`);
        toast.success("Recipe deleted successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Error deleting recipe");
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found</div>;
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
          {recipe.title}
        </h1>

        <div className="mb-6">
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Category
          </h2>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {recipe.category}
          </p>
        </div>

        <div className="mb-6">
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Cooking Time
          </h2>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {recipe.cookingTime} minutes
          </p>
        </div>

        <div className="mb-6">
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Ingredients
          </h2>
          <ul
            className={`list-disc list-inside ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } my-6`}
        ></div>

        <div className="mb-6">
          <h2
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Instructions
          </h2>
          <p
            className={`whitespace-pre-line ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {recipe.instructions}
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(`/edit/${recipe._id}`)}
            className={`px-6 py-2 rounded font-semibold ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Edit Recipe
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-6 py-2 rounded font-semibold relative ${
              isDarkMode
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            } ${deleting ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {deleting ? (
              <>
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                </span>
                <span className="opacity-0">Delete Recipe</span>
              </>
            ) : (
              "Delete Recipe"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
