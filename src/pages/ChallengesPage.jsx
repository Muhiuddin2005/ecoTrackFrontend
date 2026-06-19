import React, { useEffect, useState } from 'react';
import Challenge from '../components/Challenge';
import SkeletonChallengeCard from '../components/SkeletonChallengeCard';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const filterChallenges = async (filterQuery) => {
    setLoading(true);
    try {
      const res = await fetch(`https://ass-10-sigma.vercel.app/api/challenges/filter${filterQuery}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setChallenges(data);
    } catch (err) {
      console.error("Error fetching filtered challenges:", err);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterChallenges("");
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (minParticipants) params.append('minParticipants', minParticipants);
    if (maxParticipants) params.append('maxParticipants', maxParticipants);

    filterChallenges(`?${params.toString()}`);
  };

  return (
    <>
      <form onSubmit={handleFilterSubmit} className="mb-6 p-4 flex gap-4">
        <input
          type="text"
          placeholder="Category (comma separated)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Participants"
          value={minParticipants}
          onChange={(e) => setMinParticipants(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Participants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Filter
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <SkeletonChallengeCard key={index} />)
          : challenges.length > 0
          ? challenges.map((challenge) => <Challenge key={challenge._id} challenge={challenge} />)
          : <div className="col-span-full text-center text-base-content/60 font-medium py-10">No challenges found.</div>}
      </div>
    </>
  );
};

export default ChallengesPage;
