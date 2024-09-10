import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const {id} = useParams();
  return (
    <div>
      <h1>RecipeDetail:{id}</h1>
    </div>
  );
};

export default RecipeDetail;
