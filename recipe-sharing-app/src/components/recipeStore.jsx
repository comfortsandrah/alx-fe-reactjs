import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (recipe) => {
    set((state) => ({ recipes: [...state.recipes, recipe] }));
  },
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
