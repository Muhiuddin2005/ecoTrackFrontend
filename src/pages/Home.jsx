import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList, ResponsiveContainer, Cell } from "recharts";
import Spinner from "../components/Spinner";
import MyLink from "../components/MyLink";


const getEventImage = (title) => {
  const t = title ? title.toLowerCase() : "";
  if (t.includes("clean-up") || t.includes("cleaning")) {
    return "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("tree") || t.includes("plantation")) {
    return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("beach")) {
    return "https://images.unsplash.com/photo-1526951914846-8a59b9d4be5e?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("recycle") || t.includes("recycling") || t.includes("workshop")) {
    return "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("solar") || t.includes("seminar")) {
    return "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("wildlife") || t.includes("nature") || t.includes("tour")) {
    return "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("cook") || t.includes("cooking")) {
    return "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes("garden")) {
    return "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80";
  }
  return "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80";
};

const Home = () => {
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
      fetchJson("https://ass-10-sigma.vercel.app/latest-tips", []),
      fetchJson("https://ass-10-sigma.vercel.app/featured-events", []),
      fetchJson("https://ass-10-sigma.vercel.app/live-stats", {
        totalParticipants: 0,
        totalCO2Reduced: 0,
        totalWaterLiterSaved: 0
      })
    ])
      .then(([tipsData, eventsData, statsData]) => {
        console.log("EcoTrack Home Data Loaded:", {
          tips: tipsData,
          events: eventsData,
          stats: statsData
        });
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
        {events.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={events.slice(0, 3).length > 1}
            className="w-full max-w-6xl rounded-2xl shadow-lg"
          >
            {events.slice(0, 3).map((event) => (
              <SwiperSlide
                key={event._id}
                className="flex flex-col items-center justify-center bg-base-100 border border-base-200/50 p-8 text-center rounded-2xl transition-all duration-300 hover:bg-base-200"
              >
                <div className="w-full h-96 rounded-xl mb-5 flex flex-col items-center justify-center text-white shadow-md p-6 relative overflow-hidden group">
                  <img
                    src={getEventImage(event.title)}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-6xl mb-4 animate-bounce">📅</span>
                    <span className="text-3xl font-extrabold tracking-wide mb-2 drop-shadow-md">
                      {event.title}
                    </span>
                    <div className="flex items-center gap-4 text-lg font-semibold bg-black/30 backdrop-blur-md py-2 px-6 rounded-full mt-2 border border-white/10">
                      <span>📍 {event.location}</span>
                      <span>•</span>
                      <span>🕒 {new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-base-content/80 mb-4 max-w-2xl text-lg leading-relaxed">
                  {event.description}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-base-content/60 font-medium py-10 bg-base-100 rounded-2xl shadow-md p-8 w-full max-w-6xl">
            No featured events available.
          </div>
        )}
      </div>
  



    

    
    {/* Dynamic................... */}
    <div className="p-4 flex flex-col items-center space-y-7">
  
  <div className="w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Recent Tips</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tips.map((tip, index) => (
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
