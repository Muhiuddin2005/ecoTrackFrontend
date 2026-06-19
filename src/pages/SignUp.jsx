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
    <div className="flex p-4 items-center justify-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-xs p-6 shadow-lg rounded-lg bg-base-100 border border-base-200"
      >
        <fieldset className="p-4 border rounded-md border-base-300">
          <legend className="text-primary font-bold text-lg px-2">Join EcoTrack</legend>

          <label className="mt-3 label block font-medium text-base-content/85">Name</label>
          <input
            type="text"
            name="name"
            className="mt-1 p-2 w-full input rounded-md border border-base-300 bg-base-100 text-base-content focus:ring-2 focus:outline-none focus:ring-primary"
            placeholder="Name"
          />

          <label className="mt-3 label block font-medium text-base-content/85">Email</label>
          <input
            type="email"
            name="email"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Email"
          />

          <label className="mt-3 label block font-medium text-base-content/85">Profile Picture (Optional)</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="file-input file-input-bordered mt-1 w-full border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="relative mt-3">
            <label className="label block font-medium text-base-content/85">Password</label>
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
              className="absolute text-base-content/60 top-10 right-2 cursor-pointer hover:text-primary"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button className="mt-5 transition font-bold rounded-md py-2 w-full bg-primary hover:bg-primary/90 text-primary-content cursor-pointer">
            Sign Up
          </button>

          <p className="text-sm mt-3 text-center text-base-content/85">
            Already have an account?
            <Link to="/logIn" className="ml-1 text-primary hover:underline font-semibold">
              Log in
            </Link>
          </p>

          <div className="my-4 gap-3 flex items-center justify-center">
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
  );
};

export default SignUp;
