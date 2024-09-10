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
            Instructions:<span className="italic">{recipe.title}</span>{" "}
          </h1>
          <img src={recipe.image} alt={recipe.title} className="rounded-full" />
          <p className="flex flex-wrap">
            Ingredients:<span>{recipe.summary}</span>
          </p>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading message or handle the case where no recipe is found
      )}
    </div>
  );
};

export default RecipeDetail;
