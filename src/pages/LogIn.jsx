import React, { useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import MyLink from "../components/MyLink";
import { showSuccess, showError } from "../utils/swal";
const provider = new GoogleAuthProvider();

const LogIn = () => {
  const [show, setShow] = useState(false);
  const emailref = useRef(null);
  const { setUser, setLoading } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";


  const handleGoogle = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        showSuccess("Log In successful!").then(() => {
          navigate(from);
        });
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setIsLoggingIn(false);
        setLoading(false);
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        showSuccess("Log In successful!").then(() => {
          navigate(from);
        });
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setIsLoggingIn(false);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <form
        onSubmit={handleLogIn}
        className="w-full max-w-sm bg-base-100 border border-base-200 shadow-lg rounded-lg p-6"
      >
        <fieldset className="border border-base-300 p-4 rounded-md" disabled={isLoggingIn}>
          <legend className="text-xl font-bold text-primary px-2">Login to EcoTrack</legend>

          <label className="label mt-4 block font-medium text-base-content/85">
            Email
          </label>
          <input
            type="email"
            ref={emailref}
            name="email"
            className="input w-full border border-base-300 bg-base-100 text-base-content rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Email"
            required
          />

          <div className="relative mt-4">
            <label className="label block font-medium text-base-content/85">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="input w-full border border-base-300 bg-base-100 text-base-content rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <span
              onClick={() => !isLoggingIn && setShow(!show)}
              className="absolute right-2 top-10 cursor-pointer text-base-content/60 hover:text-primary"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>
          <Link
            to="/forgot-password"
            className="mt-2 text-sm text-primary hover:underline inline-block"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-content font-bold py-2 rounded-md transition-colors cursor-pointer disabled:bg-base-300 disabled:text-base-content/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>

          <p className="mt-3 text-center text-sm text-base-content/85">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-primary hover:underline font-semibold">
              Create one
            </Link>
          </p>

          <div className="my-4 flex items-center justify-center gap-3">
            <div className="flex-1 h-px bg-base-300"></div>
            <div className="text-base-content/50 text-sm">or</div>
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          <button
            type="button"
            disabled={isLoggingIn}
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 text-base-content font-semibold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:bg-base-200 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              <>
                <FcGoogle size={24} />
                Continue with Google
              </>
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LogIn;
