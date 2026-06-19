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
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-200">
      {/* Animated Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 via-teal-900 to-green-950 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Floating leaves/particles background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute w-4 h-4 bg-emerald-400 rounded-full blur-sm top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute w-6 h-6 bg-teal-400 rounded-full blur-md bottom-1/4 right-1/3 animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute w-3 h-3 bg-green-300 rounded-full blur-xs top-2/3 left-1/2 animate-bounce" style={{ animationDuration: '6s' }}></div>
        </div>

        {/* Tree/Globe SVG with glowing rotate/scale animations */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <div className="w-48 h-48 mb-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl relative group hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-28 h-28 fill-emerald-400 animate-spin" style={{ animationDuration: '60s' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 bg-clip-text text-transparent">
            Welcome to EcoTrack
          </h2>
          <p className="text-emerald-100/90 text-lg leading-relaxed font-medium">
            Join our global community of eco-warriors tracking habits, completing sustainable challenges, and planting seeds of change for a greener tomorrow.
          </p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={handleLogIn}
          className="w-full max-w-md bg-base-100 border border-base-200 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
        >
          <fieldset className="border border-base-300 p-6 rounded-2xl" disabled={isLoggingIn}>
            <legend className="text-2xl font-extrabold text-primary px-2">Login to EcoTrack</legend>

            <label className="label mt-4 block font-semibold text-base-content/85">
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
              <label className="label block font-semibold text-base-content/85">
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
                className="absolute right-3 top-11 cursor-pointer text-base-content/60 hover:text-primary"
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
              className="mt-6 w-full bg-primary hover:bg-primary/90 text-primary-content font-bold py-3 rounded-md transition-colors cursor-pointer disabled:bg-base-300 disabled:text-base-content/50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-md"
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

            <p className="mt-4 text-center text-sm text-base-content/85">
              Don’t have an account?{" "}
              <Link to="/signUp" className="text-primary hover:underline font-semibold">
                Create one
              </Link>
            </p>

            <div className="my-5 flex items-center justify-center gap-3">
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
    </div>
  );
};

export default LogIn;
