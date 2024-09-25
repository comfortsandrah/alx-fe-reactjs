import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

// Reusable InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-6 rounded md:items-center p-2">
      <label htmlFor={name} className="md:min-w-44 text-left font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded p-2"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const Search = () => {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minimumRepositories: 0,
  });
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchedDataError, setFetchedDataError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      name === "minimumRepositories"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({
    username: "",
    location: "",
    minimumRepositories: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (formData.minimumRepositories < 0) {
      newErrors.minimumRepositories =
        "Minimum repositories should be 0 or more";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchedDataError(null);
    setFetchedData(null);
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      try {
        const queryString = encodeURIComponent(`${formData.username} in:login`);
        const res = await fetchUserData(queryString);
        if (res.status === 200) {
          setFetchedData(res.data);
          console.log(res.data)
        } else {
          setFetchedDataError(res.errors);
        }
        setFormData({ username: "", location: "", minimumRepositories: 0 });
      } catch (error) {
        setFetchedDataError(error);
        setFormData({ username: "", location: "", minimumRepositories: 0 });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border w-[360px] rounded flex flex-col justify-center py-3 shadow md:w-[500px] mx-auto md:mt-8 mt-16 sm:mx-3"
      >
        <InputField
          label="Username"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          error={errors.username}
          onChange={handleChange}
          required
        />

        <InputField
          label="Location"
          name="location"
          placeholder="Enter your location"
          value={formData.location}
          error={errors.location}
          onChange={handleChange}
          required
        />

        <InputField
          label="Minimum Repositories"
          name="minimumRepositories"
          type="number"
          placeholder="Minimum Repositories"
          value={formData.minimumRepositories}
          error={errors.minimumRepositories}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-red-500 p-3 px-6 w-fit mx-auto rounded-xl hover:bg-red-300 hover:outline hover:outline-red-700"
        >
          Submit
        </button>
      </form>

      {fetchedData.total_count>0 && (
        <div className="flex flex-col mt-6 items-center shadow rounded w-[300px] p-4 mx-auto hover:scale-105">
          <img
            src={fetchedData.avatar_url}
            alt={fetchedData.login}
            className="w-24 h-24 rounded-xl mx-auto hover:scale-105 hover:shadow-xl my-4"
          />
          <p className="text-base font-semibold">{fetchedData.login}</p>
          <a
            href={fetchedData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline hover:underline-offset-2"
          >
            Link to my profile
          </a>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {fetchedDataError && (
        <p className="text-red-500 mt-3">Looks like we can't find the user</p>
      )}
    </>
  );
};

export default Search;
