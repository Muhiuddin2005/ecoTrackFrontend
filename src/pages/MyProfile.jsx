import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const { user } = use(AuthContext);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6 text-base-content">
      <div className="bg-base-100 border border-base-200/60 shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=random`}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
        />
        <h2 className="text-2xl font-semibold text-base-content">
          {user.displayName || "Anonymous"}
        </h2>
        <p className="text-base-content/70 mt-2">{user.email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
