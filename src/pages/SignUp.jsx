import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { showSuccess, showError } from "../utils/swal";

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, setUser, setLoading } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleGoogle = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        showSuccess("Signup Successful!").then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        showError(error.message);
      });
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const displayName = e.target.name.value;
    const password = e.target.password.value;
    const imageFile = e.target.photo.files[0];
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{6,}$/;

    if (!regExp.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include at least one uppercase, one lowercase, and one special character."
      );
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    let photoURL = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const imgData = await imgResponse.json();
        if (imgData.success) {
          photoURL = imgData.data.url;
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        showError("Image upload failed, using default avatar.");
      }
    }

    signUp(email, password)
      .then((res) => {
        updateProfile(res.user, { displayName, photoURL })
          .then(() => {
            setUser({ ...res.user, displayName, photoURL: photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=random` });
            showSuccess("Signup Successful!").then(() => {
              navigate("/");
              window.location.reload();
            });
          })
          .catch((error) => showError(error.message));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showError("User already exists! Please Log in.");
        } else {
          showError(error.message);
        }
      });
    setLoading(false);
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
            Join the Eco Revolution
          </h2>
          <p className="text-emerald-100/90 text-lg leading-relaxed font-medium">
            Create an account to start contributing to our active challenges, sharing sustainability tips, and seeing your community footprint decrease!
          </p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md bg-base-100 border border-base-200 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
        >
          <fieldset className="p-6 border rounded-2xl border-base-300">
            <legend className="text-2xl font-extrabold text-primary px-2">Join EcoTrack</legend>

            <label className="mt-4 label block font-semibold text-base-content/85">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full input rounded-md border border-base-300 bg-base-100 text-base-content focus:ring-2 focus:outline-none focus:ring-primary"
              placeholder="Name"
            />

            <label className="mt-3 label block font-semibold text-base-content/85">Email</label>
            <input
              type="email"
              name="email"
              className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />

            <label className="mt-3 label block font-semibold text-base-content/85">Profile Picture (Optional)</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="file-input file-input-bordered mt-1 w-full border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="relative mt-3">
              <label className="label block font-semibold text-base-content/85">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className={`input mt-1 w-full border p-2 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-400" : "border-base-300 focus:ring-primary"
                }`}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute text-base-content/60 top-11 right-3 cursor-pointer hover:text-primary"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button className="mt-6 transition font-bold rounded-md py-3 w-full bg-primary hover:bg-primary/90 text-primary-content cursor-pointer text-lg shadow-md">
              Sign Up
            </button>

            <p className="text-sm mt-4 text-center text-base-content/85">
              Already have an account?
              <Link to="/logIn" className="ml-1 text-primary hover:underline font-semibold">
                Log in
              </Link>
            </p>

            <div className="my-5 gap-3 flex items-center justify-center">
              <div className="w-16 bg-base-300 h-px"></div>
              <div className="text-base-content/50 text-sm">or</div>
              <div className="w-16 bg-base-300 h-px"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 p-3 rounded-md border border-base-300 bg-base-100 hover:bg-base-200 text-base-content font-semibold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
