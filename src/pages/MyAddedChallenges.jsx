import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router";

const MyAddedChallenges = () => {
  const { user } = use(AuthContext)
  const [loading, setLoading] = useState(true)
  const [challenges, setChallenges] = useState([])


  useEffect(() => {

    fetch(`https://ass-10-sigma.vercel.app/my-added-challenges?email=${user.email}`, {
    })
      .then(res => res.json())
      .then(data => {
        setChallenges(data)
        setLoading(false)
      })

  }, [user])
  console.log(challenges)

  if (loading) {
    return <Spinner />;
  }
  if (challenges.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-base-content/60 bg-base-200">
        You have not added any challenges yet.
      </div>
    );
  }
  return (
    <div className="bg-base-200 text-base-content min-h-screen py-10 px-4">
      <div className="flex justify-center my-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="bg-base-100 border border-base-300 shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2 text-center text-primary">
                {challenge.title}
              </h2>
              <p className="text-base-content/70 mb-1 text-center">
                Category: {challenge.category}
              </p>
              <p className="text-base-content/85 mb-3 text-center">
                {challenge.description}
              </p>

              <div className="text-base-content/75 space-y-1 mb-4 text-center">
                <p>Duration: {challenge.duration} days</p>
                <p>Participants: {challenge.participants}</p>
                <p>Target: {challenge.target}</p>
                <p>Impact Metric: {challenge.impactMetric}</p>
                <p>Start Date: {challenge.startDate}</p>
                <p>End Date: {challenge.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAddedChallenges;