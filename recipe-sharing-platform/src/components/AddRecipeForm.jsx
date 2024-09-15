import React, { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    preparation: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    ingredients: "",
    preparation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.title) {
      setFormErrors((prev) => ({ ...prev, title: "Title is required" }));
      isValid = false;
    } else {
      setFormErrors((prev) => ({ ...prev, title: "" }));
    }

    if (!formData.ingredients) {
      setFormErrors((prev) => ({
        ...prev,
        ingredients: "Ingredient is required",
      }));
      isValid = false;
    } else {
      setFormErrors((prev) => ({ ...prev, ingredients: "" }));
    }

    if (!formData.preparation) {
      setFormErrors((prev) => ({
        ...prev,
        preparation: "Preparation is required",
      }));
      isValid = false;
    } else {
      setFormErrors((prev) => ({ ...prev, preparation: "" }));
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      setFormData({ title: "", ingredients: "", preparation: "" });
    } else {
      console.log(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  max-w-[450px] shadow p-6 text-left"
    >
      <div className="flex gap-4 p-4">
        <label htmlFor="title" className="font-semibold text-base min-w-[90px]">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Add recipe"
          onChange={handleChange}
          value={formData.title}
          className="border p-3"
        />
        {formErrors.title && <p> formErrors.title</p>}
      </div>
      <div className="flex gap-4 p-4">
        <label htmlFor="ingredients" className="font-semibold text-base min-w-[90px]">
          Ingredients
        </label>
        <textarea
          name="ingredients"
          id="ingredients"
          placeholder="Write the ingredients"
          onChange={handleChange}
          value={formData.ingredients}
          className="border p-3"
        ></textarea>
        {formErrors.ingredients && <p>formErrors.ingredients</p>}
      </div>
      <div className="flex gap-4 p-4">
        <label htmlFor="preparation" className="font-semibold text-base min-w-[90px]">
          Preparation
        </label>
        <textarea
          name="preparation"
          id="preparation"
          placeholder="How to prepare the recipe"
          onChange={handleChange}
          value={formData.preparation}
          className="border p-3"
        ></textarea>
        {formErrors.preparation && <p>formErrors.preparation</p> }
      </div>
      <button type="submit" className="bg-purple-500 rounded-full w-fit p-2 px-6 mx-auto hover:opacity-80">Submit</button>
    </form>
  );
};

export default AddRecipeForm;
