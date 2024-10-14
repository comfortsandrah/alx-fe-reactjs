import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

function getQueryFromURL(url) {
  try {
    const queryString = new URL(url).searchParams.get("q"); // Extracts the value of the 'q' parameter
    return queryString || ""; // Return the extracted query or an empty string if not found
  } catch (error) {
    console.error("Invalid URL", error);
    return "";
  }
}

function parseLinkHeader(linkHeader) {
  if (!linkHeader) return {};

  const links = linkHeader.split(", ");
  const parsedLinks = {};

  links.forEach((link) => {
    const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) {
      const url = match[1];
      const rel = match[2];
      parsedLinks[rel] = url;
    }
  });

  return parsedLinks;
}

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
      <div className="flex flex-col gap-1">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border rounded p-2 "
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const Search = () => {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minimumRepositories: 0,
  });
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchedDataError, setFetchedDataError] = useState();

  const [pages, setPages] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      name === "minimumRepositories"
        ? parseInt(e.target.value)
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
        const queryString = encodeURIComponent(
          `${formData.username} repos:>${formData.minimumRepositories} location:${formData.location}`
        );
        await fetchData(queryString);
      } catch (error) {
        setFetchedDataError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Updated fetchData method
  const fetchData = async (queryString) => {
    try {
      const res = await fetchUserData(queryString);L
      if (res.status === 200) {
        setFetchedData(res.data);
        const pages = parseLinkHeader(res.headers.link);
        setPages(pages);
      } else {
        setFetchedDataError(res.errors);
      }
    } catch (error) {
      setFetchedDataError(error);
    }
  };

  // Updated handlePageNavigation method
  const handlePageNavigation = async (pageUrl) => {
    if (!pageUrl) return;
    const queryString = getQueryFromURL(pageUrl); // Extract the 'q' parameter
    setLoading(true);
    await fetchData(queryString); // Fetch data without re-encoding the query
    setLoading(false);
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
          className="bg-red-500 p-3 mt-4 px-6 w-fit mx-auto rounded-xl hover:opacity-70 hover:outline hover:outline-red-600 "
        >
          Submit
        </button>
      </form>

      {fetchedData?.total_count && (
        <div className="flex flex-wrap">
          {fetchedData?.items.map((item, index) => (
            <div
              className="flex flex-col mt-6 items-center shadow rounded w-[300px] p-4 mx-auto hover:scale-105"
              key={index}
            >
              <img
                src={item.avatar_url}
                alt={item.login}
                className="w-24 h-24 rounded-xl mx-auto hover:scale-105 hover:shadow-xl my-4"
              />
              <p className="text-base font-semibold">{item.login}</p>
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline hover:underline-offset-2"
              >
                Link to my profile
              </a>
            </div>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {fetchedDataError && (
        <p className="text-red-500 mt-3">Looks like we can't find the user</p>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4 gap-4">
        {pages.first && (
          <button
            onClick={() => handlePageNavigation(pages.first)}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            First
          </button>
        )}
        {pages.prev && (
          <button
            onClick={() => handlePageNavigation(pages.prev)}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {pages.next && (
          <button
            onClick={() => handlePageNavigation(pages.next)}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            Next
          </button>
        )}
        {pages.last && (
          <button
            onClick={() => handlePageNavigation(pages.last)}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            Last
          </button>
        )}
      </div>
    </>
  );
};

export default Search;
