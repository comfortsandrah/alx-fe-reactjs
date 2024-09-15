import React, { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const handleChange = (e) => {
    const { target } = e;
    const name = target.name;
    const value = target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.title) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, title: "" }));
    }

    if (!formData.ingredients) {
      setErrors((prev) => ({
        ...prev,
        ingredients: "Ingredient is required",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, ingredients: "" }));
    }

    if (!formData.steps) {
      setErrors((prev) => ({
        ...prev,
        steps: "steps is required",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, steps: "" }));
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      setFormData({ title: "", ingredients: "", steps: "" });
    } else {
      console.log(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  sm:max-w-[450px] md:max-w-[550px] shadow p-6 text-left"
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
        {errors.title && <p> {errors.title}</p>}
      </div>
      <div className="flex gap-4 p-4">
        <label
          htmlFor="ingredients"
          className="font-semibold text-base min-w-[90px]"
        >
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
        {errors.ingredients && <p>{errors.ingredients}</p>}
      </div>
      <div className="flex gap-4 p-4">
        <label htmlFor="steps" className="font-semibold text-base min-w-[90px]">
          steps
        </label>
        <textarea
          name="steps"
          id="steps"
          placeholder="How to prepare the recipe"
          onChange={handleChange}
          value={formData.steps}
          className="border p-3"
        ></textarea>
        {errors.steps && <p>{errors.steps}</p>}
      </div>
      <button
        type="submit"
        className="bg-purple-500 rounded-full w-fit p-2 px-6 mx-auto hover:opacity-80"
      >
        Submit
      </button>
    </form>
  );
};

export default AddRecipeForm;
