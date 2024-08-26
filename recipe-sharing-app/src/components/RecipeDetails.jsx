// RecipeDetails component
import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === id)
  );

  return (
    <div>
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          {/* Render EditRecipeForm and DeleteRecipeButton here */}
        </>
      )}
      {"recipe not found"}
    </div>
  );
};

export default RecipeDetails;
