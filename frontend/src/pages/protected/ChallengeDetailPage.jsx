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

  console.log(challenge);
  const startChallenge = () => {
    const data = {
      challengeId: challenge?._id,
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
        console.log(err.message);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <div className="animate-pulse text-[#302630]/40 text-sm">
          Loading challenge…
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
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
      <div className="min-h-screen" style={{ backgroundColor: "#f9f6f4" }}>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            zIndex: "-1",
          }}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Page Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-10 pb-8 border-b border-gray-200 flex items-center gap-3"
          >
            <Link
              to="/challenges"
              className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 hover:text-[#f75d31] transition-colors"
            >
              Challenges
            </Link>
            <span className="text-[#302630]/20">/</span>
            <span className="text-xs font-medium uppercase tracking-widest text-[#302630]/60">
              {challenge.name}
            </span>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white px-10  border-b border-gray-200 py-10 md:py-14"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left Column - Challenge Info */}
              <div className="space-y-6 flex flex-col">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {challenge.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium uppercase tracking-widest text-[#302630]/40 border border-gray-200 px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs font-medium uppercase tracking-widest text-[#302630]/40 border border-gray-200 px-2.5 py-1">
                    {difficulty.title}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-medium text-[#302630] tracking-tight leading-tight">
                  {challenge.name}
                </h2>

                {/* Description */}
                <p className="text-[#302630]/50 -mt-2 text-base leading-relaxed">
                  {challenge.description}
                </p>

                {/* Participants */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-8 h-8 bg-[#302630]/5 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-[#302630]" />
                  </div>
                  <p className="text-sm text-[#302630]/50">
                    Join <span className="font-medium text-[#302630]">211</span>{" "}
                    people who have taken this challenge
                  </p>
                </div>

                {/* Start Button */}
                <div className="w-full">
                  <button
                    onClick={startChallenge}
                    className="bg-[#302630] hover:bg-[#f75d31] text-white text-sm font-medium py-3 px-8 cursor-pointer flex items-center gap-2 transition-colors uppercase tracking-widest"
                  >
                    <Lock className="w-4 h-4" />
                    Start Challenge
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 bg-white p-6 min-h-64 flex flex-col items-center justify-center gap-2">
                  <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30">
                    Preview
                  </p>
                  <p className="text-sm text-[#302630]/40">Coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white mb-5 border-b border-gray-200 p-6 md:p-10 mt-0"
          >
            <h3 className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-8">
              Challenge Details
            </h3>

            <div className="space-y-6">
              {/* Full Description */}
              <div>
                <h4 className="text-sm font-medium text-[#302630] mb-3">
                  About this challenge
                </h4>
                <p className="text-sm text-[#302630]/60 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Compulsory Features */}
              {challenge.compulsoryFeatures &&
                challenge.compulsoryFeatures.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[#302630] mb-3">
                      Compulsory Features
                    </h4>
                    <ul className="space-y-2">
                      {challenge.compulsoryFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-5 h-5 bg-[#302630]/5 text-[#302630]/50 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-[#302630]/60 leading-relaxed">
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
                    <h4 className="text-sm font-medium text-[#302630] mb-3">
                      Nice to Have Features
                    </h4>
                    <ul className="space-y-2">
                      {challenge.niceToHaveFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-5 h-5 bg-[#302630]/5 text-[#302630]/30 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-[#302630]/60 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-1">
                      Time Limit
                    </p>
                    <p className="text-sm text-[#302630]">
                      {challenge.timeAllowed} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-1">
                      Difficulty
                    </p>
                    <p className="text-sm text-[#302630]">{difficulty.title}</p>
                  </div>
                  {challenge.tags && challenge.tags.length > 0 && (
                    <div className="sm:col-span-2">
                      <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-2">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {challenge.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 border border-gray-200 text-[#302630]/60 text-xs font-medium uppercase tracking-wider"
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
