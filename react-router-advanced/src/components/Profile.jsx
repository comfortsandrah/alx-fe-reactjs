import React from "react";
import { Outlet, Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="details">Profile Details</Link>
          </li>
          <li>
            <Link to="settings">Profile Settings</Link>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* Renders the child route component */}
    </div>
  );
};

export default Profile;
