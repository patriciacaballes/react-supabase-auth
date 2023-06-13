import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../supabase/client";

const Update = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [full_name, setFullname] = useState("");

  const updateProfile = async () => {
    if (user) {
      // Create an object with only non-null fields
      const updateData = {};
      if (username) updateData.username = username;
      if (website) updateData.website = website;
      if (full_name) updateData.full_name = full_name;

      // Perform the update in the "profiles" table for the current user
      const { data, error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        console.log("Profile updated successfully");
      }
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
      />
      <input
        type="text"
        value={full_name}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Fullname"
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  );
};

export default Update;
