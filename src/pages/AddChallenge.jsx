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
        console.error("Image upload error:", err);
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
      .then(() => {
        showSuccess("Challenge added successfully!");
        e.target.reset();
      })
      .catch((err) => {
        showError(err.message);
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-28 h-28 fill-emerald-400 animate-bounce" style={{ animationDuration: '3s' }}>
              <path d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 12c2.5-3.5 6-3.5 6-3.5s0 3.5-3.5 6c-3.5 2.5-6.5 1-6.5 1s1-3 4-3.5z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 bg-clip-text text-transparent">
            Create a New Challenge
          </h2>
          <p className="text-emerald-100/90 text-lg leading-relaxed font-medium">
            Empower others to make a positive impact. Design sustainable goals, invite the community, and track the cumulative green impact!
          </p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-base-100 border border-base-200 shadow-2xl rounded-3xl p-8 space-y-4 relative overflow-hidden"
        >
          <h2 className="text-center text-3xl font-extrabold text-primary mb-6">
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
                onClick={(e) => e.target.showPicker?.()}
                className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                required
              />
            </div>

            <div>
              <label className="text-xs text-base-content/65 font-medium ml-1">End Date</label>
              <input
                type="date"
                name="endDate"
                onClick={(e) => e.target.showPicker?.()}
                className="w-full input border border-base-300 bg-base-100 text-base-content rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
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
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-content font-bold rounded-md cursor-pointer transition-colors mt-4 text-lg shadow-md"
          >
            Add Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChallenge;
