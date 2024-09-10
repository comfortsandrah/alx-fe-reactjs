import React from "react";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  return (
    <div className="">
      <h1 className="md:text-2xl sm:text-xl font-bold text-green-700">
        Recipe List
      </h1>
      <ul className="">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="shadow my-4 rounded-xl bg-orange-200 text-center p-4 md:p-8 hover:shadow-lg"
          >
            <h2 className="font-semibold text-lg underline underline-offset-2 text-green-700 hover:text-green-500 select-none">
              {recipe.title}
            </h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="mx-auto rounded-full my-4 hover:scale-110 transition-transform duration-300 ease-in-out sm:w-24 sm:h-24 md:w-36 md:h-36"
            />
            <p className="md:text-base sm:text-sm ">{recipe.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
