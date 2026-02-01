/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Home, TargetIcon, LogOut } from "lucide-react";
import Button from "../ui/Button";
import useAuthStore from "../../stores/auth/authStore";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
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
            <Link to="/challenges">
              <Button
                variant="secondary"
                className="text-sm flex items-center gap-2"
              >
                <TargetIcon size={16} />
                <span className="hidden sm:inline">Challenges</span>
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
  );
};

export default DashboardHeader;
