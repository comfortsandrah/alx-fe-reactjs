import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const [recipes, setRecipes] = useState([]);
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  // Find the recipe that matches the id from the URL
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  return (
    <div>
      {recipe ? ( // If the recipe is found, display its details
        <div className="shadow p-4 text-center">
          <h1 className="flex flex-wrap font-bold text-green-700">
            {recipe.title}
          </h1>
          <img src={recipe.image} alt={recipe.title} className="rounded-full" />
          <p className="mt-4">
            <strong>Summary:</strong> {recipe.summary}
          </p>
          <h2 className="font-semibold mt-4">Ingredients:</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="font-semibold mt-4">Instructions:</h2>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading message or handle the case where no recipe is found
      )}
    </div>
  );
};

export default RecipeDetail;
