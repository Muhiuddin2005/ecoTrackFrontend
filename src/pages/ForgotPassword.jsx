import React, { useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { showSuccess, showError } from "../utils/swal";
import { Link } from "react-router";

const ForgotPassword = () => {
  const emailRef = useRef();

  const handleReset = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      showError("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        showSuccess("Check your inbox or spam folder to reset your password!");
        e.target.reset();
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm bg-base-100 border border-base-200 shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Reset Your Password
        </h2>
        <p className="text-base-content/70 text-sm text-center mb-4">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        <label className="block font-medium text-base-content/85 mb-1">Email</label>
        <input
          type="email"
          ref={emailRef}
          placeholder="example@email.com"
          className="w-full border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-content font-semibold py-2 rounded-md cursor-pointer transition-colors"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-3">
          <Link
            to="/logIn"
            className="text-sm text-primary hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
