import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes })
  // deleteRecipe: (id) => {
  //   set((state) => ({
  //     recipes: state.recipes.filter((recipe) => recipe.id !== id),
  //   }));
  // },
  // updateRecipe: (id) => {
  //   recipes: state.recipes.updateRecipe
  // }
}));

export default useRecipeStore;
