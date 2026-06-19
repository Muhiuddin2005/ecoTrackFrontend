import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router";

const myAddedChallenges = () => {
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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        You have not added any challenges yet.
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center min-h-screen my-15">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
    {challenges.map((challenge) => (
      <div
        key={challenge._id}
        className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
      >
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {challenge.title}
        </h2>
        <p className="text-gray-600 mb-1 text-center">
          Category: {challenge.category}
        </p>
        <p className="text-gray-700 mb-3 text-center">
          {challenge.description}
        </p>

        <div className="text-gray-600 space-y-1 mb-4 text-center">
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

export default myAddedChallenges;