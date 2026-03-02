/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion } from "motion/react";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import {
  Swords,
  TargetIcon,
  TrophyIcon,
  LogOut,
  Home,
  ArrowRight,
} from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
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

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-50 border-b border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Active"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button
                  variant="secondary"
                  className="text-sm flex items-center gap-2 h-8 px-3"
                >
                  <Home size={14} />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              <Link to="/challenges">
                <Button
                  variant="secondary"
                  className="text-sm flex items-center gap-2 h-8 px-3"
                >
                  <TargetIcon size={14} />
                  <span className="hidden sm:inline">Challenges</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="text-sm flex items-center gap-2 h-8 px-3"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Welcome Hero ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="pt-16 pb-14 border-b border-gray-200"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-4">
            Dashboard
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#302630] tracking-tight leading-none">
            Welcome back,{" "}
            <span className="text-[#f75d31]">
              {user?.email?.split("@")[0] || "Engineer"}
            </span>
          </h1>
          <p className="text-base text-[#302630]/50 max-w-lg mt-5 leading-relaxed">
            We&apos;re crafting an exceptional experience for you. Practice
            challenges, multiplayer battles, and leaderboards are on their way.
          </p>
        </motion.div>

        {/* ─── Feature Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-gray-200">
          {/* Practice Mode */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="sm:border-r border-b sm:border-b-0 border-gray-200 p-8 sm:p-10 flex flex-col justify-between min-h-64"
          >
            <div>
              <div className="w-10 h-10 bg-[#302630]/5 flex items-center justify-center mb-6 text-[#302630]">
                <TargetIcon size={18} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-medium text-[#302630] mb-2">
                Practice Mode
              </h2>
              <p className="text-sm text-[#302630]/50 leading-relaxed">
                Build features at your own pace. Get AI feedback and improve
                your skills.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/challenges">
                <InteractiveHoverButton className="bg-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-2 px-5 text-white text-sm cursor-pointer">
                  Browse challenges
                </InteractiveHoverButton>
              </Link>
            </div>
          </motion.div>

          {/* Multiplayer Mode */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="sm:border-r border-b sm:border-b-0 border-gray-200 p-8 sm:p-10 flex flex-col justify-between min-h-64"
          >
            <div>
              <div className="w-10 h-10 bg-[#302630]/5 flex items-center justify-center mb-6 text-[#302630]">
                <Swords size={18} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-medium text-[#302630] mb-2">
                Multiplayer Mode
              </h2>
              <p className="text-sm text-[#302630]/50 leading-relaxed">
                Compete in real-time 1v1 or 5-player matches. Build features
                under time pressure.
              </p>
            </div>
            <div className="mt-8">
              <span className="text-xs font-medium tracking-widest uppercase text-[#f75d31] border border-[#f75d31]/30 px-3 py-1.5">
                Coming Soon
              </span>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="p-8 sm:p-10 flex flex-col justify-between min-h-64"
          >
            <div>
              <div className="w-10 h-10 bg-[#302630]/5 flex items-center justify-center mb-6 text-[#302630]">
                <TrophyIcon size={18} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-medium text-[#302630] mb-2">
                Leaderboard
              </h2>
              <p className="text-sm text-[#302630]/50 leading-relaxed">
                See how you rank against other developers. Track your progress
                over time.
              </p>
            </div>
            <div className="mt-8">
              <span className="text-xs font-medium tracking-widest uppercase text-[#f75d31] border border-[#f75d31]/30 px-3 py-1.5">
                Coming Soon
              </span>
            </div>
          </motion.div>
        </div>

        {/* ─── Status strip ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-sm text-[#302630]/50 max-w-lg leading-relaxed">
            <span className="font-medium text-[#302630]">Stay tuned.</span>{" "}
            We&apos;re working hard to bring you the best competitive
            engineering platform.
          </p>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#302630] hover:text-[#f75d31] transition-colors shrink-0"
          >
            View all challenges
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
