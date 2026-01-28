/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion } from "motion/react";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import { Swords, TargetIcon, TrophyIcon, LogOut, Home } from "lucide-react";

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
          height: "800px",
          position: "absolute",
          "z-index": "-1",
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

      {/* Dashboard Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-50 py-3 md:py-4"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Active"
                className="h-8 sm:h-10 md:h-10 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/">
                <Button
                  variant="secondary"
                  className="text-sm flex items-center gap-2"
                >
                  <Home size={16} />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="text-sm flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Coming Soon Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#302630] mb-4 md:mb-6"
          >
            Welcome
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="pl-2 sm:pl-3 text-[#f75d31] block sm:inline mt-2 sm:mt-0"
            >
              {user?.email?.split("@")[0] || "User"}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg text-[#302630]/70 max-w-2xl mx-auto px-4"
          >
            We're crafting an exceptional experience for you. Practice
            challenges, multiplayer battles, and leaderboards are on their way.
          </motion.p>
        </motion.div>

        {/* Feature Preview Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12"
        >
          {/* Practice Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white/80 rounded-2xl p-6 sm:p-8 transition-all duration-300"
          >
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-[#302630]">
              <TargetIcon size={40} className="sm:w-11.5 sm:h-11.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-[#302630]">
              Practice Mode
            </h2>
            <p className="text-sm sm:text-base text-[#302630]/70 mb-4 sm:mb-6 leading-relaxed">
              Build features at your own pace. Get AI feedback and improve your
              skills.
            </p>
            <div className="inline-block py-2 text-[#f75d31] rounded-full text-sm font-medium">
              Coming Soon
            </div>
          </motion.div>

          {/* Multiplayer Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="bg-white/80 rounded-2xl p-6 sm:p-8 transition-all duration-300"
          >
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-[#302630]">
              <Swords size={40} className="sm:w-11.5 sm:h-11.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-[#302630]">
              Multiplayer Mode
            </h2>
            <p className="text-sm sm:text-base text-[#302630]/70 mb-4 sm:mb-6 leading-relaxed">
              Compete in real-time 1v1 or 5-player matches. Build features under
              time pressure.
            </p>
            <div className="inline-block py-2 text-[#f75d31] rounded-full text-sm font-medium">
              Coming Soon
            </div>
          </motion.div>

          {/* Leaderboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-white/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 sm:col-span-2 lg:col-span-1"
          >
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-[#302630]">
              <TrophyIcon size={40} className="sm:w-11.5 sm:h-11.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-[#302630]">
              Leaderboard
            </h2>
            <p className="text-sm sm:text-base text-[#302630]/70 mb-4 sm:mb-6 leading-relaxed">
              See how you rank against other developers. Track your progress
              over time.
            </p>
            <div className="inline-block py-2 text-[#f75d31] rounded-full text-sm font-medium">
              Coming Soon
            </div>
          </motion.div>
        </motion.div>

        {/* Notification Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-block bg-white/80 rounded-2xl p-6 sm:p-8 max-w-2xl">
            <p className="text-sm sm:text-base md:text-lg text-[#302630]/70">
              <span className="font-semibold text-[#302630]">Stay tuned!</span>{" "}
              We're working hard to bring you the best competitive engineering
              platform. Follow us for updates.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
