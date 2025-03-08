import { AUTH_ENDPOINTS, RECIPE_ENDPOINTS, axiosInstance } from "./config";

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  signup: async (email, password, name) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, {
      email,
      password,
      name,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },
};

// Recipe API calls
export const recipeAPI = {
  getAllRecipes: async () => {
    const response = await axiosInstance.get(RECIPE_ENDPOINTS.LIST);
    return response.data;
  },

  getRecipe: async (id) => {
    const response = await axiosInstance.get(RECIPE_ENDPOINTS.DETAIL(id));
    return response.data;
  },

  createRecipe: async (recipeData) => {
    const response = await axiosInstance.post(
      RECIPE_ENDPOINTS.CREATE,
      recipeData
    );
    return response.data;
  },

  updateRecipe: async (id, recipeData) => {
    const response = await axiosInstance.put(
      RECIPE_ENDPOINTS.UPDATE(id),
      recipeData
    );
    return response.data;
  },

  deleteRecipe: async (id) => {
    const response = await axiosInstance.delete(RECIPE_ENDPOINTS.DELETE(id));
    return response.data;
  },
};
