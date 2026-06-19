import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../utils/swal";
import Spinner from "../components/Spinner";
import MyLink from "../components/MyLink";

const MyActivities = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://ass-10-sigma.vercel.app/participants?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setChallenges(data);
          setLoading(false);
        })
        .catch((e) => {
          showError(e.message || e);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-base-100 text-base-content">
      <div className="flex justify-around my-10 items-center">
        <MyLink to="/add-challenge">Add Challenge</MyLink>
        <MyLink to="/my-added-challenges">My Added Challenges</MyLink>
      </div>
      {challenges.length === 0 ? (
        <div className="flex items-center justify-center text-base-content/60 font-medium py-20 text-lg">
          You have not joined any challenges yet.
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">I have Joined</h1>
          <div className="grid gap-4 md:grid-cols-2">
            {challenges.map((p) => (
              <div
                key={p._id}
                className="border border-base-300 bg-base-100 rounded-xl p-5 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold mb-3 text-primary">
                    Challenge ID: {p._id.slice(-6).toUpperCase()}
                  </h2>
                  <div className="space-y-1 mb-6 text-base-content/85">
                    <p>
                      <span className="font-semibold text-base-content">Status:</span>{" "}
                      <span className="badge badge-accent font-medium text-xs py-1">{p.status}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-base-content">Progress:</span>{" "}
                      {p.progress}%
                    </p>
                    <p>
                      <span className="font-semibold text-base-content">Joined On:</span>{" "}
                      {new Date(p.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <MyLink
                  to={`/challenge-details/${p.challengeId}`}
                  className="bg-primary text-primary-content font-bold py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors inline-block w-full cursor-pointer"
                >
                  View Details
                </MyLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyActivities;