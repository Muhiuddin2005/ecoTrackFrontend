import { use, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { BounceLoader } from "react-spinners";
import MyLink from "./MyLink";
import { NavLink } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa";
import { showSuccess, showError } from "../utils/swal";

const Navbar = () => {
  const { user, setUser, loading } = use(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        showSuccess("Signed out successfully!");
        setUser(null);
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow space-y-2"
          >
            <li>
              <MyLink to="/" end>
                Home
              </MyLink>
            </li>
            <li>
              <MyLink to="/challenges">Challenges</MyLink>
            </li>
            <li>
              <MyLink to="/my-activities">My Activities</MyLink>
            </li>
            {!user && (
              <>
                <li>
                  <MyLink to="/logIn">Login</MyLink>
                </li>
                <li>
                  <MyLink to="/signUp">Register</MyLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center gap-2">
          <img
            className="w-10 h-10"
            src="data:image/png;base64,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"
            alt="EcoTrack Logo"
          />
          <span className="font-bold text-lg text-green-600">EcoTrack</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-0 w-full gap-15">
          <li className="flex-1 text-center">
            <MyLink to="/" end>Home</MyLink>
          </li>
          <li className="flex-1 text-center">
            <MyLink to="/challenges">Challenges</MyLink>
          </li>
          <li className="text-center">
            <MyLink to="/my-activities">My Activities</MyLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl transition-all duration-300 hover:bg-base-200 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-emerald-700 hover:scale-110 transition-transform duration-300" />
          ) : (
            <FaSun className="text-amber-400 hover:scale-110 transition-transform duration-300" />
          )}
        </button>
        {loading ? (
          <BounceLoader color="#0ff051" size={50} speedMultiplier={3} />
        ) : user ? (
          <details className="dropdown dropdown-end">
            <summary className="btn m-1 flex items-center gap-2">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=random`}
                alt="User Avatar"
              />
              <span>{user?.displayName || "User"}</span>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm space-y-2">
              <li>
                <MyLink to="/profile">Profile</MyLink>
              </li>
              <li>
                <MyLink to="/my-activities">My Activities</MyLink>
              </li>
              <li>
                <button className="shadow-md hover:shadow-lg inline-block px-4 py-2 rounded-lg font-semibold text-black transition-all duration-300  bg-gradient-to-r from-green-400 to-green-300 hover:from-green-450 hover:to-green-300" onClick={logOut}>Logout</button>
              </li>
            </ul>
          </details>
        ) : (
          <>
            <div>
              <MyLink to="/logIn">Login</MyLink>
            </div>
            <div>
              <MyLink to="/signUp">Register</MyLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
