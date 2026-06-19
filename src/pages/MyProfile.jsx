import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const { user } = use(AuthContext);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=random`}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          {user.displayName || "Anonymous"}
        </h2>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
