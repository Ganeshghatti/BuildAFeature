/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../stores/auth/authStore";
import Button from "../ui/Button";
import { InteractiveHoverButton } from "../animated/InteractiveHoverButton";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on dashboard route
  if (location.pathname === "/dashboard") {
    return null;
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Benefits", sectionId: "benefits" },
    { label: "How It Works", sectionId: "how-it-works" },
    { label: "Tech Stack", sectionId: "tech-stack" },
    { label: "Challenges", sectionId: "challenges" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative z-50 py-4 md:py-6"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="shrink-0 absolute left-0 sm:static"
          >
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Active"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.sectionId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-[#302630] hover:text-[#f75d31] font-normal transition-colors text-md cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Auth Buttons & Mobile Menu Toggle */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4 relative z-50 ml-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {isAuthenticated ? (
              <div className="hidden sm:flex  items-center gap-5">
                <Link to="/dashboard">
                  <Button className="text-sm  bg-[#302630]">Dashboard</Button>
                </Link>
                <Button
                  variant="secondary"
                  onClick={logout}
                  className="text-sm "
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                to="/signup"
                aria-label="Get Started"
                className="hidden sm:block"
              >
                <InteractiveHoverButton className="bg-[#302630] py-2 text-white text-sm sm:text-base">
                  Get Started
                </InteractiveHoverButton>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#302630] hover:text-[#f75d31] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <motion.nav
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="pt-4 pb-6 space-y-4"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.sectionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.sectionId)}
                    className="block w-full text-left px-4 py-2 text-[#302630] hover:text-[#f75d31] hover:bg-gray-50 rounded-lg font-normal transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 px-4 space-y-3 border-t border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full text-sm bg-[#302630]">
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-sm"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <InteractiveHoverButton className="w-full bg-[#302630] py-3 text-white">
                        Get Started
                      </InteractiveHoverButton>
                    </Link>
                  )}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
