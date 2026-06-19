import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { showSuccess, showError } from "../utils/swal";

const AddChallenge = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image.files[0];
    let imageUrl = "";

    if (imageFile) {
      const imgData = new FormData();
      imgData.append("image", imageFile);
      try {
        const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: "POST",
          body: imgData,
        });
        const imgResData = await imgResponse.json();
        if (imgResData.success) {
          imageUrl = imgResData.data.url;
        } else {
          showError("Image upload failed");
          return;
        }
      } catch (err) {
        showError("Image upload failed");
        return;
      }
    } else {
      showError("Please select an image");
      return;
    }

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      duration: parseInt(e.target.duration.value),
      target: e.target.target.value,
      participants: 0,
      impactMetric: e.target.impactMetric.value,
      createdBy: user.email,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      imageUrl: imageUrl,
    };

    fetch("https://ass-10-sigma.vercel.app/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess("Challenge added successfully!");
        e.target.reset();
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-100 border border-base-300 shadow-lg rounded-lg p-6 space-y-4"
      >
        <h2 className="text-center text-2xl font-bold text-primary mb-4">
          Add New Challenge
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Title: Local Wildlife Protection"
            required
          />

          <input
            type="text"
            name="category"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Category: Conservation"
            required
          />

          <textarea
            name="description"
            rows="3"
            className="w-full border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Description: Protect and monitor local wildlife habitats."
            required
          ></textarea>

          <input
            type="number"
            name="duration"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Duration: 40 (days)"
            required
          />

          <input
            type="text"
            name="target"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Target: Increase wildlife sightings"
            required
          />

          <input
            type="text"
            name="impactMetric"
            className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Impact Metric: number of species protected"
            required
          />

          <div>
            <label className="text-xs text-base-content/65 font-medium ml-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs text-base-content/65 font-medium ml-1">End Date</label>
            <input
              type="date"
              name="endDate"
              className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs text-base-content/65 font-medium ml-1">Challenge Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full mt-1 border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-content font-bold rounded-md cursor-pointer transition-colors mt-2"
        >
          Add Challenge
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;
