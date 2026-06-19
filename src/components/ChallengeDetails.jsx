import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";
import { showSuccess, showError, showLoginRequired, showConfirm } from "../utils/swal";

const ChallengeDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data.result);
        setLoading(false);
      });
  }, [user, id, refetch]);

  const handleUpdate = () => {
    if (!user) {
      showLoginRequired(navigate, "Please log in to update this challenge.");
      return;
    }
    navigate(`/update-challenge/${challenge._id}`);
  };

  const handleDelete = () => {
    if (!user) {
      showLoginRequired(navigate, "Please log in to delete this challenge.");
      return;
    }
    if (user.email !== challenge.createdBy) {
      showError("You can only delete your own challenge.");
      return;
    }

    showConfirm("Are you sure?", "You won't be able to revert this!", "Yes, delete it!").then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate('/');
            showSuccess("Your challenge has been deleted.");
          })
          .catch((e) => {
            showError(e.message || e);
          });
      }
    });
  };

  const handleParticipate = () => {
    if (!user) {
      showLoginRequired(navigate, "Please log in to participate.");
      return;
    }
    const ParticipantChallenge = {
      challengeId: challenge._id,
      participatedBy: user.email,
      status: "Ongoing",
      progress: 0,
      joinDate: new Date(),
    };

    fetch(`https://ass-10-sigma.vercel.app/participants/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ParticipantChallenge),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showSuccess("Successfully Participated!");
        setRefetch(!refetch);
      })
      .catch((e) => {
        showError(e.message || e);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="max-w-md w-full p-6 bg-base-100 border border-base-300 rounded-xl shadow-lg text-center">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-primary">{challenge.title}</h2>
        <p className="text-base-content/70 mb-1">Category: {challenge.category}</p>
        <p className="text-base-content/85 mb-3">{challenge.description}</p>

        <div className="text-base-content/80 space-y-1 mb-6 text-left border-t border-b border-base-300 py-3 my-3">
          <p><strong>Duration:</strong> {challenge.duration} days</p>
          <p><strong>Participants:</strong> {challenge.participants}</p>
          <p><strong>Target:</strong> {challenge.target}</p>
          <p><strong>Impact Metric:</strong> {challenge.impactMetric}</p>
          <p><strong>Start Date:</strong> {challenge.startDate}</p>
          <p><strong>End Date:</strong> {challenge.endDate}</p>
          <p><strong>Created By:</strong> {challenge.createdBy}</p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleUpdate}
            className="bg-primary text-primary-content px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleParticipate}
            className="bg-secondary text-secondary-content px-4 py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors cursor-pointer"
          >
            Participate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;