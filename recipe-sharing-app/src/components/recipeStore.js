import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],

      addRecipe: (newRecipe) => set((state) => ({
        recipes: [...state.recipes, newRecipe],
      })),

      setRecipes: (recipes) => set({ recipes }),

      deleteRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        })),

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
      name: 'recipe-storage',
      getStorage: () => localStorage,
    }
  ));

export default useRecipeStore;
