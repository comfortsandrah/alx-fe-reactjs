import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),

  deleteRecipe: (recipeId) => set((state) =>
    state.recipes.filter(recipe => recipe.id !== recipeId)
  ),
  updateRecipe: (recipeId, title, description) => set((state) =>
    state.recipes.map(recipe => {
      if (recipe.id === recipeId) {
        recipe.title = title;
        recipe.description = description;
      }
      return recipe
    }))
}));

export default useRecipeStore;
