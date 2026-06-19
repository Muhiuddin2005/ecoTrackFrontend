import { use, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";
import { showSuccess, showError, showLoginRequired, showConfirm } from "../utils/swal";
import gsap from "gsap";

const ChallengeDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [hasParticipated, setHasParticipated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data.result);
        setLoading(false);
      });
  }, [user, id, refetch]);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const tl = gsap.timeline();

      // Initialize trunks & branches to hidden
      gsap.set(".gsap-trunk, .gsap-branch", { strokeDasharray: 200, strokeDashoffset: 200 });
      gsap.set(".gsap-leaf", { scale: 0, transformOrigin: "center center" });
      gsap.set(".gsap-card", { y: 60, opacity: 0 });

      // Animate Card Entrance
      tl.to(".gsap-card", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
      });

      // Animate Trunk
      tl.to(".gsap-trunk", {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.out"
      }, "-=1.0");

      // Animate Branches
      tl.to(".gsap-branch", {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.3,
        ease: "power2.out"
      }, "-=0.8");

      // Animate Leaves growing (scale up with elastic ease)
      tl.to(".gsap-leaf", {
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }, "-=1.0");

      // Fireflies floating animation loop
      const fireflies = containerRef.current.querySelectorAll(".gsap-firefly");
      fireflies.forEach((firefly) => {
        gsap.to(firefly, {
          x: "random(-120, 120)",
          y: "random(-500, -900)",
          opacity: "random(0.2, 0.8)",
          scale: "random(0.5, 1.8)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: "random(0, 8)"
        });
      });
    }
  }, [loading]);

  useEffect(() => {
    if (user?.email && id) {
      fetch(`https://ass-10-sigma.vercel.app/participants?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const participated = data.some((item) => item.challengeId === id);
            setHasParticipated(participated);
          }
        })
        .catch((err) => console.error("Error checking participation:", err));
    } else {
      setHasParticipated(false);
    }
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
    if (hasParticipated) {
      showError("You have already participated in this challenge.");
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
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-950 relative overflow-hidden">
      {/* SVG Glow Filters definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="magical-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Magical floating fireflies */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="gsap-firefly absolute w-3 h-3 bg-amber-300 rounded-full blur-[2px] opacity-0"
            style={{
              bottom: "-20px",
              left: `${Math.random() * 90 + 5}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Growing SVG Trees in background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-end px-4 md:px-12 z-0">
        {/* Left Tree */}
        <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 opacity-60 transform translate-y-10" style={{ transformOrigin: "bottom center" }}>
          <path className="gsap-trunk" d="M100,200 L100,100" stroke="#78350f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,150 Q80,130 60,130" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,130 Q120,110 140,120" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,100 Q80,80 70,80" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,100 L100,60" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          
          <circle className="gsap-leaf" cx="60" cy="130" r="12" fill="#10B981" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="140" cy="120" r="14" fill="#059669" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="70" cy="80" r="10" fill="#34D399" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="100" cy="60" r="16" fill="#10B981" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="80" cy="110" r="10" fill="#047857" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="120" cy="90" r="12" fill="#059669" filter="url(#magical-glow)" />
        </svg>

        {/* Right Tree */}
        <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 opacity-60 transform scale-x-[-1] translate-y-10" style={{ transformOrigin: "bottom center" }}>
          <path className="gsap-trunk" d="M100,200 L100,100" stroke="#78350f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,150 Q80,130 60,130" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,130 Q120,110 140,120" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,100 Q80,80 70,80" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="gsap-branch" d="M100,100 L100,60" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          
          <circle className="gsap-leaf" cx="60" cy="130" r="12" fill="#10B981" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="140" cy="120" r="14" fill="#059669" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="70" cy="80" r="10" fill="#34D399" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="100" cy="60" r="16" fill="#10B981" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="80" cy="110" r="10" fill="#047857" filter="url(#magical-glow)" />
          <circle className="gsap-leaf" cx="120" cy="90" r="12" fill="#059669" filter="url(#magical-glow)" />
        </svg>
      </div>

      <div className="gsap-card max-w-xl w-full p-8 bg-base-100/90 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl text-center relative z-10">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
        />
        <h2 className="text-3xl font-extrabold mb-2 text-primary">{challenge.title}</h2>
        <span className="badge badge-accent badge-outline font-semibold mb-3">{challenge.category}</span>
        <p className="text-base-content/85 text-lg mb-6 leading-relaxed">{challenge.description}</p>

        <div className="text-base-content/80 space-y-2 mb-6 text-left border-t border-b border-base-300/60 py-4 my-4 text-base font-medium">
          <p>📅 <strong>Duration:</strong> {challenge.duration} days</p>
          <p>👥 <strong>Participants:</strong> {challenge.participants}</p>
          <p>🎯 <strong>Target:</strong> {challenge.target}</p>
          <p>⚡ <strong>Impact Metric:</strong> {challenge.impactMetric}</p>
          <p>🚀 <strong>Start Date:</strong> {new Date(challenge.startDate).toLocaleDateString()}</p>
          <p>🏁 <strong>End Date:</strong> {new Date(challenge.endDate).toLocaleDateString()}</p>
          <p>✍️ <strong>Created By:</strong> {challenge.createdBy}</p>
        </div>

        <div className="flex justify-center gap-4">
          {user && user.email === challenge.createdBy && (
            <>
              <button
                onClick={handleUpdate}
                className="bg-primary text-primary-content px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md cursor-pointer"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={handleParticipate}
            disabled={hasParticipated}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
              hasParticipated
                ? "bg-base-300 text-base-content/40 cursor-not-allowed"
                : "bg-secondary text-secondary-content hover:bg-secondary/90"
            }`}
          >
            {hasParticipated ? "Already Participated" : "Participate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;