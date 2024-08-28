import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],
      searchTerm: '',
      filteredRecipes: [],

      // Action to set the search term
      setSearchTerm: (term) => set({ searchTerm: term }),

      // Action to filter recipes based on the search term
      filterRecipes: () =>
        set((state) => ({
          filteredRecipes: state.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
        })),

      // Action to add a new recipe
      addRecipe: (newRecipe) =>
        set((state) => ({
          recipes: [...state.recipes, newRecipe],
        })),

      // Action to set the recipes array directly
      setRecipes: (recipes) => set({ recipes }),

      // Action to delete a recipe by its ID
      deleteRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        })),

      // Action to update a recipe by its ID
      updateRecipe: (recipeId, title, description) =>
        set((state) => ({
          recipes: state.recipes.map((recipe) => {
            if (recipe.id === recipeId) {
              return { ...recipe, title, description }; // Return a new object with updated values
            }
            return recipe;
          }),
        })),
    }),
    {
      name: "recipe-storage", // Name of the storage item in localStorage
      getStorage: () => localStorage, // Specify the storage to use (localStorage)
    }
  )
);

export default useRecipeStore;
