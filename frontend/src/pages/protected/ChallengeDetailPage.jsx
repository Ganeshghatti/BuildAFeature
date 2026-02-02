/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { challengeEndpoints } from "../../api/endpoints/challenges";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion } from "motion/react";
import { Lock, Users } from "lucide-react";
import DashboardHeader from "../../components/layout/DashboardHeader";
import Footer from "../../components/layout/Footer";
import { apiClient } from "@/api/client";

const difficultyConfig = {
  easy: {
    class: "bg-emerald-100 text-emerald-800",
    label: "Easy",
    level: "1",
    title: "JUNIOR",
  },
  medium: {
    class: "bg-amber-100 text-amber-800",
    label: "Medium",
    level: "2",
    title: "INTERMEDIATE",
  },
  hard: {
    class: "bg-orange-100 text-orange-800",
    label: "Hard",
    level: "3",
    title: "SENIOR",
  },
  expert: {
    class: "bg-rose-100 text-rose-800",
    label: "Expert",
    level: "4",
    title: "EXPERT",
  },
  master: {
    class: "bg-violet-100 text-violet-800",
    label: "Master",
    level: "5",
    title: "MASTER",
  },
};

const getDifficulty = (d) =>
  difficultyConfig[d] || {
    class: "bg-gray-100 text-gray-700",
    label: d || "—",
    level: "1",
    title: "JUNIOR",
  };

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    challengeEndpoints
      .getById(id)
      .then((res) => {
        if (!cancelled) setChallenge(res.data?.challenge);
      })
      .catch(() => {
        if (!cancelled) setChallenge(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const startChallenge = () => {
    const data = {
      challengeId: "65f1a2b3c4d5e6f7890a1234",
      challengeVersion: 1,
    };
    apiClient
      .post("/submissions/start", data)
      .then((res) => {
        console.log(res);
        navigate(
          `/challenges/${id}/editor?submissionId=${res.data.submission._id}`,
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-['Host_Grotesk']"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <div className="animate-pulse text-gray-500">Loading challenge…</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 font-['Host_Grotesk']"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <p className="text-gray-600">Challenge not found.</p>
        <Link to="/challenges">
          <Button variant="primary">Back to challenges</Button>
        </Link>
      </div>
    );
  }

  const difficulty = getDifficulty(challenge.difficulty);

  return (
    <>
      <DashboardHeader />
      <div
        className="min-h-screen font-['Host_Grotesk']"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ width: "100%", height: "800px" }}
        >
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#f8f8f8"
            activeColor="#f75d31"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl  p-6 md:p-10"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Challenge Info */}
              <div className="space-y-6 flex mt-16 flex-col items-center lg:items-start max-w-xl mx-auto lg:mx-0">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {challenge.tags?.slice(0, 3).map((tag) => {
                    let colorClass = "text-gray-600 border-gray-300";
                    const lower = tag.toLowerCase();
                    if (lower.includes("html"))
                      colorClass = "text-blue-600 border-blue-300 bg-blue-50";
                    else if (lower.includes("css"))
                      colorClass = "text-blue-500 border-blue-200 bg-blue-50";
                    else if (
                      lower.includes("js") ||
                      lower.includes("javascript")
                    )
                      colorClass =
                        "text-orange-600 border-orange-300 bg-orange-50";

                    return (
                      <span
                        key={tag}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full  uppercase tracking-wider ${colorClass}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                  <span
                    className={`${difficulty.class} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}
                  >
                    LEVEL {difficulty.level} - {difficulty.title}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#f75d31] text-center lg:text-left">
                  {challenge.name}
                </h2>

                {/* Description */}
                <p className="text-gray-600 -mt-4 text-base leading-relaxed text-center lg:text-left">
                  {challenge.description}
                </p>

                {/* Participants */}
                <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                  <div className="w-9 h-9 rounded-full bg-[#F75D31]/10 flex items-center justify-center">
                    <Users className="w-3 h-3 text-[#F75D31]" />
                  </div>
                  <p className="text-gray-700">
                    Join <span className="font-bold text-[#f75d31]">211</span>{" "}
                    people who have taken this challenge
                  </p>
                </div>

                {/* Start Button */}
                <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
                  <button
                    onClick={startChallenge}
                    className="w-full lg:w-1/2 bg-gray-400 hover:bg-[#302630] text-white font-bold py-4 px-6 rounded-full cursor-pointer flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                  >
                    <Lock className="w-5 h-5" />
                    Start Challenge
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 min-h-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <p className="text-sm">Challenge Preview</p>
                    <p className="text-xs mt-1">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl  p-6 md:p-10 mt-6"
          >
            <h3 className="text-2xl font-bold text-[#f75d31] mb-6">
              Challenge Details
            </h3>

            <div className="space-y-6">
              {/* Full Description */}
              <div>
                <h4 className="text-lg font-semibold text-[#f75d31] mb-3">
                  About this challenge
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Compulsory Features */}
              {challenge.compulsoryFeatures &&
                challenge.compulsoryFeatures.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-[#f75d31] mb-3">
                      Compulsory Features
                    </h4>
                    <ul className="space-y-2">
                      {challenge.compulsoryFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Nice to Have Features */}
              {challenge.niceToHaveFeatures &&
                challenge.niceToHaveFeatures.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-[#f75d31] mb-3">
                      Nice to Have Features
                    </h4>
                    <ul className="space-y-2">
                      {challenge.niceToHaveFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-semibold text-[#f75d31] mb-1">
                      Time Limit
                    </h5>
                    <p className="text-gray-600">
                      {challenge.timeAllowed} minutes
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#f75d31] mb-1">
                      Difficulty
                    </h5>
                    <p className="text-gray-600">
                      {difficulty.label} (Level {difficulty.level})
                    </p>
                  </div>
                  {challenge.tags && challenge.tags.length > 0 && (
                    <div className="sm:col-span-2">
                      <h5 className="text-sm font-semibold text-[#f75d31] mb-2">
                        Technologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {challenge.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChallengeDetailPage;
