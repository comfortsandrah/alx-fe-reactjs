import useRecipeStore from "./recipeStore";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filtered = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <SearchBar />
      {filtered.length > 0 ? (
        filtered.map((recipe) => (
          <div key={recipe.id} className="recipes">
            <Link to={`/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipes">
            <Link to={`/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>N recipes available</p>
      )}
    </div>
  );
};
export default RecipeList;
