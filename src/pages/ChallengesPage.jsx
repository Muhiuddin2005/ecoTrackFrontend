import React, { useEffect, useState } from 'react';
import Challenge from '../components/Challenge';
import SkeletonChallengeCard from '../components/SkeletonChallengeCard';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    filterChallenges(`?${params.toString()}`);
  };

  const handleReset = () => {
    setCategory('');
    setMinParticipants('');
    setMaxParticipants('');
    setStartDate('');
    setEndDate('');
    filterChallenges("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen bg-base-200 text-base-content rounded-2xl my-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Explore Challenges</h1>
      
      <form onSubmit={handleFilterSubmit} className="mb-8 p-6 bg-base-100 border border-base-300 shadow-md rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/75 ml-1">Category</label>
            <input
              type="text"
              placeholder="e.g. Waste Reduction"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary focus:outline-none rounded-lg p-2"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/75 ml-1">Min Participants</label>
            <input
              type="number"
              placeholder="0"
              value={minParticipants}
              onChange={(e) => setMinParticipants(e.target.value)}
              className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary focus:outline-none rounded-lg p-2"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/75 ml-1">Max Participants</label>
            <input
              type="number"
              placeholder="100"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary focus:outline-none rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/75 ml-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onClick={(e) => e.target.showPicker?.()}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary focus:outline-none rounded-lg p-2 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/75 ml-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onClick={(e) => e.target.showPicker?.()}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary focus:outline-none rounded-lg p-2 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content rounded-lg px-6 py-2 transition-all font-semibold cursor-pointer"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary px-8 py-2 text-white font-bold rounded-lg transition-all cursor-pointer"
          >
            Filter
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonChallengeCard key={index} />)
          : challenges.length > 0
          ? challenges.map((challenge) => <Challenge key={challenge._id} challenge={challenge} />)
          : <div className="col-span-full text-center text-base-content/60 font-medium py-16 text-lg">No challenges found matching your criteria.</div>}
      </div>
    </div>
  );
};

export default ChallengesPage;
