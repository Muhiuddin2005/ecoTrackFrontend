import Swal from "sweetalert2";

const getThemeColors = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    background: isDark ? "#0c140f" : "#ffffff",
    color: isDark ? "#ecfdf5" : "#111827",
    confirmButtonColor: "#16a34a", // Vibrant eco-green
    cancelButtonColor: "#6b7280",  // Cool gray
  };
};

export const showSuccess = (text, title = "EcoTrack") => {
  const colors = getThemeColors();
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "Okay",
    ...colors,
  });
};

export const showError = (text, title = "Error") => {
  const colors = getThemeColors();
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Okay",
    ...colors,
  });
};

export const showInfo = (text, title = "EcoTrack") => {
  const colors = getThemeColors();
  return Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonText: "Okay",
    ...colors,
  });
};

export const showLoginRequired = (navigate, message = "Please log in to continue.") => {
  const colors = getThemeColors();
  return Swal.fire({
    title: "Login Required",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Log in",
    cancelButtonText: "Okay",
    ...colors,
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/logIn");
    }
  });
};

export const showConfirm = (title = "Are you sure?", text = "You won't be able to revert this!", confirmButtonText = "Yes") => {
  const colors = getThemeColors();
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    ...colors,
  });
};
