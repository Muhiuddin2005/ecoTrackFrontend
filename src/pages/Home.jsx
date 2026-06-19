import Challenge from "../components/Challenge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList, ResponsiveContainer, Cell } from "recharts";
import SkeletonChallengeCard from "../components/SkeletonChallengeCard";
import Skeleton from "react-loading-skeleton";
import Spinner from "../components/Spinner";
import MyLink from "../components/MyLink";


const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
  totalParticipants: 0,
  totalCO2Reduced: 0,
  totalWaterLiterSaved: 0
});
const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchJson = async (url, fallback) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
        return fallback;
      }
    };

    Promise.all([
      fetchJson("https://ass-10-sigma.vercel.app/active-challenges", []),
      fetchJson("https://ass-10-sigma.vercel.app/latest-tips", []),
      fetchJson("https://ass-10-sigma.vercel.app/featured-events", []),
      fetchJson("https://ass-10-sigma.vercel.app/live-stats", {
        totalParticipants: 0,
        totalCO2Reduced: 0,
        totalWaterLiterSaved: 0
      })
    ])
      .then(([data, tipsData, eventsData, statsData]) => {
        console.log("EcoTrack Home Data Loaded:", {
          challenges: data,
          tips: tipsData,
          events: eventsData,
          stats: statsData
        });
        setChallenges(data);
        setTips(tipsData);
        
        setEvents(eventsData);
        
        setStats(statsData);
      })
      .finally(() => setLoading(false));
  }, []);
  const data = [
  {
    metric: "Community Impact",
    "CO₂ Reduced (kg)": stats.totalCO2Reduced,
    "Water Saved (L)": stats.totalWaterLiterSaved,
    "Total Participants": stats.totalParticipants
  }
];
if (loading) return <Spinner/>
  return (
    <>


    {/* Corouesel....................... */}


      <div className="w-full flex justify-center items-center py-10 bg-base-200">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-6xl rounded-2xl shadow-lg"
        >
          {challenges.map((challenge) => (
            <SwiperSlide
              key={challenge._id}
              className="flex flex-col items-center justify-center bg-base-100 border border-base-200/50 p-8 text-center rounded-2xl transition-all duration-300 hover:bg-base-200"
            >
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="h-100 rounded-xl mb-5 w-full object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-2xl font-bold text-primary mb-2">
                {challenge.title}
              </h2>
              <p className="text-base-content/80 mb-4">
                {challenge.description?.slice(0, 80)}...
              </p>
              <MyLink
                to={`/challenge-details/${challenge._id}`}
                className="bg-primary text-primary-content px-5 py-2 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 inline-block cursor-pointer"
              >
                View Challenge
              </MyLink>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Cards...................... */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {challenges.length > 0
        ? challenges.slice(0, 5).map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} />
          ))
        :
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonChallengeCard key={index} />
          ))}
      </div>
  



    

    
    {/* Dynamic................... */}
    <div className="p-4 flex flex-col items-center space-y-7">
  
  <div className="w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Recent Tips</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading
            ? Array.from({ length: 4 }).map((index) => (
                <div
                  key={index}
                  className="p-5 border border-base-300 bg-base-100 rounded-2xl shadow-lg transition transform duration-300"
                >
                  <Skeleton height={20} width="70%" className="mb-2" />
                  <Skeleton height={14} width="50%" className="mb-3" />
                  <Skeleton count={3} height={12} className="mb-2" />
                </div>
              ))
            :tips.map((tip, index) => (
        <div 
          key={index} 
          className="p-5 border border-base-200/60 bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-base-200 transition transform duration-300" 
        > 
          <h3 className="font-semibold text-lg mb-1 text-primary">{tip.title}</h3>
          <p className="text-sm text-base-content/70 mb-2 font-medium">By {tip.authorName} | Upvotes: {tip.upvotes}</p>
          <p className="text-base-content/85 text-sm">{tip.content}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Featured Events</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading
            ? Array.from({ length: 4 }).map((index) => (
                <div
                  key={index}
                  className="p-5 border border-base-300 bg-base-100 rounded-2xl shadow-lg transition transform duration-300"
                >
                  <Skeleton height={20} width="70%" className="mb-2" />
                  <Skeleton height={14} width="50%" className="mb-3" />
                  <Skeleton count={3} height={12} className="mb-2" />
                </div>
              ))
            :events.map((event, index) => (
        <div 
          key={index} 
          className="p-5 border border-base-200/60 bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-base-200 transition transform duration-300"
        >
          <h3 className="font-semibold text-lg mb-1 text-primary">{event.title}</h3>
          <p className="text-sm text-base-content/70 mb-2 font-medium">{new Date(event.date).toLocaleDateString()} | {event.location}</p>
          <p className="text-base-content/85 text-sm">{event.description}</p>
        </div>
      ))}
    </div>
  </div>

</div>


{/* BarChart.................................... */}

 <div className="max-w-xl mx-auto p-4 border border-base-200 rounded-lg shadow-lg bg-base-100 my-6 hover:bg-base-200 transition transform duration-300">
      <h2 className="text-2xl font-semibold text-center mb-2 text-primary">Community Totals</h2>
      <p className="text-center mb-4 text-base-content/85">
        Total Participants: <strong>{stats.totalParticipants}</strong>
      </p>
<div className="w-full min-h-[300px] h-72 sm:h-80 md:h-96 bg-base-100 rounded-xl p-4">
    <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-base-300)" />
        <XAxis dataKey="metric" tick={{ fill: 'var(--color-base-content)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--color-base-content)' }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--color-base-200)', borderRadius: '10px', border: '1px solid var(--color-base-300)', color: 'var(--color-base-content)' }}
          cursor={{ fill: 'transparent' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar dataKey="CO₂ Reduced (kg)" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={50}>
          <LabelList dataKey="CO₂ Reduced (kg)" position="top" fill="var(--color-base-content)" fontWeight="bold" formatter={(value) => `${value} kg`} />
        </Bar>
        <Bar dataKey="Water Saved (L)" fill="var(--color-secondary)" radius={[6, 6, 0, 0]} barSize={50}>
          <LabelList dataKey="Water Saved (L)" position="top" fill="var(--color-base-content)" fontWeight="bold" formatter={(value) => `${value} L`} />
        </Bar>
      </BarChart>
       </ResponsiveContainer>
  </div>
    </div>


    {/* Static........................... */}

      <div className="p-8 space-y-12 bg-base-200 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Why Go Green?</h2>
          <ul className="list-disc space-y-2 text-left max-w-md mx-auto text-base-content/85">
            <li>Reduces environmental pollution</li>
            <li>Conserves natural resources</li>
            <li>Promotes healthier living</li>
            <li>Saves energy and reduces costs</li>
            <li>Supports biodiversity and wildlife</li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto">
            <div className="bg-base-100 border border-base-300 p-6 rounded-lg shadow-md w-64">
              <h3 className="font-bold text-lg mb-2 text-primary">Step 1</h3>
              <p className="text-base-content/80">Join a challenge</p>
            </div>
            <div className="bg-base-100 border border-base-300 p-6 rounded-lg shadow-md w-64">
              <h3 className="font-bold text-lg mb-2 text-primary">Step 2</h3>
              <p className="text-base-content/80">Track progress</p>
            </div>
            <div className="bg-base-100 border border-base-300 p-6 rounded-lg shadow-md w-64">
              <h3 className="font-bold text-lg mb-2 text-primary">Step 3</h3>
              <p className="text-base-content/80">Share tips</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
