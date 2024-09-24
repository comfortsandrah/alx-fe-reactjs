import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [formData, setFormData] = useState({ username: "" });
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchedDataError, setFetchedDataError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [errors, setErrors] = useState({
    username: "",
  });

  const validateForm = () => {
    let isValid = true;
    if (!formData.username) {
      setErrors((prev) => ({ ...prev, username: "username is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      try {
        const res = await fetchUserData(formData.username);
        if (res.status === 200) {
          setFetchedData(res.data);
        } else {
          setFetchedDataError(res.errors);
        }
        // setLoading(false);
        setFormData({ username: "" });
        console.log(fetchedData);
      } catch (error) {
        setFetchedDataError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        value={formData.username}
      />
      {errors.username && <p>{errors.username}</p>}
      <button type="submit">Submit</button>

      {fetchedData && (
        <div className="flex flex-col">
          <img
            src={fetchedData.avatar_url}
            alt={fetchedData.login}
            className="w-24 h-24 rounded-xl mx-auto"
          />
          {fetchedData.login}
          <a href={fetchedData.html_url} target="_blank">
            Link to my profile
          </a>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {fetchedDataError && <p>Looks like we cant find the user</p>}
    </form>
  );
};

export default Search;
