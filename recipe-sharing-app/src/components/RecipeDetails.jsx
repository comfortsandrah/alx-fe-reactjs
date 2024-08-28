// RecipeDetails component
import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  console.log("id", id);
  // const recipe = useRecipeStore((state) =>
  //   state.recipes[0] //.find((recipe) => recipe.id === id)
  // );
  const recipes = useRecipeStore((state) => state.recipes);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  console.log(recipes);

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          {/* Render EditRecipeForm and DeleteRecipeButton here */}
          <EditRecipeForm recipe= {recipe} />
          <DeleteRecipeButton/>
        </>
      ) : (
        "recipe not found"
      )}
    </div>
  );
};

export default RecipeDetails;
