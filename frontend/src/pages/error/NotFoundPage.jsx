import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DotGrid from "@/components/animated/DotGrid";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#f9f6f4" }}
    >
      {/* DotGrid background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "0",
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

      {/* Faint 404 backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: "1" }}
      >
        <span
          className="font-medium text-[#302630]"
          style={{ fontSize: "30vw", lineHeight: 1, opacity: 0.025 }}
        >
          404
        </span>
      </div>

      {/* Content */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{ zIndex: "2" }}
      >
        {/* Top nav strip */}
        <div className="border-b border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-6">
                Error 404
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#302630] tracking-tight leading-tight mb-6">
                This page
                <br />
                <span className="text-[#f75d31]">doesn&apos;t exist.</span>
              </h1>
              <p className="text-base text-[#302630]/50 mb-10 max-w-sm leading-relaxed">
                The page you&apos;re looking for was moved, deleted, or never
                existed.
              </p>
              <Link to="/">
                <InteractiveHoverButton className="flex items-center gap-2 bg-[#302630] text-white border-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-2.5 px-6 text-sm">
                  <ArrowLeft size={14} />
                  Back to home
                </InteractiveHoverButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center">
            <p className="text-xs text-[#302630]/30">
              &copy; {new Date().getFullYear()} BuildAFeature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
