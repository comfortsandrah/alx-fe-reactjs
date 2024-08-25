import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route showing the recipe list and form */}
        <Route
          path="/"
          element={
            <>                
              <RecipeList />
              <AddRecipeForm />
            </>
          }
        />
        {/* Dynamic route for displaying recipe details based on ID */}
        <Route path="/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
